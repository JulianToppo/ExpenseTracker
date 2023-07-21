
const path = require("path");

const Expense = require("../model/expense");
const sequelize = require("../util/database");
const AWS = require('aws-sdk');
const { resolve } = require("path");
const fileDownloaded = require("../model/filesDownloaded");
const dotnet = require('dotenv').config();
const conn = require('../util/connection')
const User= require('../model/user');
const { getAddProduct } = require("../../MongoDBPractice/controllers/admin");

exports.getExpensePage = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "view", "expense.html"));
    } catch (err) {
        res.status(500).json({ Error: err });
    }
}


exports.addExpense = async (req, res, next) => {
    // const t = await sequelize.transaction();
    const session = await conn.startSession();
    try {
        session.startTransaction();
        console.log("inside add expense");
        const { expenseAmount, description, category } = req.body;
        if (!expenseAmount) {
            throw new Error("Filed expenseAmount required");
        } else {
            if (!description) {
                throw new Error("Filed description required");
            } else {
                if (!category) {
                    throw new Error("Filed category required");
                }
            }

            const data = new Expense({
                expenseAmount: expenseAmount,
                description: description,
                category: category,
                userId: req.user._id
            }, { session:session });
            data.save();

            const totalExpense = (+req.user.totalExpense) + (+expenseAmount);
           // console.log(data,data._id)
            await User.findById(req.user._id).session(session).then((product) => {
                console.log(data)
                product.expenses.push({expenseId:data._id});
                // product.addExpense(data._id);
                product.totalExpense = totalExpense

                return product.save();
            }).then(async ()=>{
                await session.commitTransaction();
                res.status(201).json({ NewExpenseEntry: data, success: "true" });
            })
        }
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({ Error: err, success: "false" });
    }
    session.endSession();
}

exports.getExpense = async (req, res, next) => {
    try {
        console.log("get expense entries ");
        const pageNo = req.params.pageNo;
        const rowCount = req.params.rowCount;

        console.log(rowCount, pageNo)
        // const totalCount = await Expense.count({
        //     where: {
        //         registeredUserId: req.user.id
        //     }
        // });
        const totalCount = req.user.expenses.length;
        
        const lastPage = (totalCount % rowCount) == 0 ? Math.floor(totalCount / rowCount) : Math.floor(totalCount / rowCount) + 1;
        console.log("lastpage", lastPage, totalCount)
        // const data = await Expense.findAll({
        //     where: { registeredUserId: req.user.id },
        //     limit: Number(rowCount),
        //     offset: (Number(pageNo) - 1) * Number(rowCount)
        // });

        const data = await Expense.find({ userId: req.user._id })
        .limit(rowCount)
        .skip((Number(pageNo) - 1) * Number(rowCount))
        .exec();
            

        console.log("expenseEntreis", data)
        res.status(200).json({
            ExpenseEntries: data, paginationValues: {
                currpage: pageNo,
                hasNext: Number(pageNo) < lastPage,
                next: Number(pageNo) + 1,
                hasPrevious: pageNo > 1,
                previous: pageNo - 1,
                last: lastPage
            }
        })
    } catch (err) {
        res.status(500).json({ Error: err });
    }

}

exports.deleteExpense = async (req, res, next) => {
    // const t = await sequelize.transaction();
    const session = await conn.startSession();
    try {
        console.log("inside delete expense function");
        session.startTransaction();
        const expenseId = req.params.expenseId;
        console.log(expenseId)
        const expense = await Expense.findById(expenseId);

        console.log(expense.expenseAmount, req.user.totalExpense);

        const totalExpense = (+req.user.totalExpense) - (+expense.expenseAmount);
        req.user.totalExpense=totalExpense;
        await req.user.save();
        const data = await Expense.findByIdAndDelete(expenseId,{session:session});
        await req.user.deleteExpenseEntry(expenseId,{session:session})
        await session.commitTransaction();
        res.status(200).json({ Delete: data });
       
    } catch (err) {
        await session.abortTransaction();
        res.status(500)
            .json({
                error: err
            })
    }
    session.endSession();
}

// exports.showReports= async (req,res,next)=>{
//     try {
//         res.sendFile(path.join(__dirname,"..","view","dayToDayExpenses.html"));
//         res.status(200);
//     } catch (error) {
//         res.status(500).json({ Error: err });
//     }
// }

function uploadToS3(data, filename) {
    console.log("inside upload to s3");
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET

    console.log(BUCKET_NAME);
    var s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        //     Bucket: BUCKET_NAME
    })

    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read' //access control list
    }

    return new Promise((resolve, reject) => {
        s3bucket.upload(params, (err, s3reponse) => {
            if (err) {
                console.log("Something went wrong", err);
                reject(err);
            } else {
                console.log("Success", s3reponse);
                resolve(s3reponse.Location);
            }
        })
    })
}

exports.downloadExpense = async (req, res, next) => {
    try {
        console.log("inside download expense");
        // const expense = await req.user.getExpenses();
        const expense = await req.user.populate('expenses.expenseId').then((i)=>{
            return i.expenses;
        });
        console.log(expense);
        const stringyfiedExpenses = JSON.stringify(expense);

        const userId = req.user._id;
        const filename = `Expense${userId}/${new Date()}.txt`;
        const fileURL = await uploadToS3(stringyfiedExpenses, filename);

        console.log("fileUrl",fileURL)
        let fileDownloadedElem=await fileDownloaded.create({
            fileURL: fileURL,
            userId: req.user._id
        })

        req.user.fileDownloaded.push({fileDownloadedId:fileDownloadedElem._id});
        await req.user.save();
        res.status(200).json({ fileURL, success: true })

    } catch (error) {
        res.status(500).json({ fileURL: '', success: 'false', error: error });
    }
}


exports.getDownloadedFiles = async (req, res, next) => {
    try {
        console.log("get downloaded files");
        const data = await req.user.populate('fileDownloaded.fileDownloadedId').then((val)=>{
            return val.fileDownloaded;
        });
        
        res.status(200).json({ DownloadedFiles: data })
    } catch (err) {
        res.status(500).json({ Error: err });
    }

}