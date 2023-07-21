
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();
const user = require('../model/user')
const forgotPasswordRequests = require('../model/forgotPasswordRequests')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mail = require('../middleware/sendMails');
const { v4: uuidv4 } = require('uuid');
const User = require('../model/user');


var generateToken = (id, ispremiumuser) => {
    return jwt.sign({ userID: id, ispremiumuser: ispremiumuser }, "secretkey");
}

var getLoginPage = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "view", "login.html"));
    } catch (err) {
        res.status(500).json({ Error: err });
    }
}

var loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;


        if (!email) {
            throw new Error("Email required");
        } else {

            if (!password) {
                throw new Error("Password required");
            }
        }

        var data = await user.find({
            email: email
        })

        console.log(data);
        if (data.length >= 1) {

            bcrypt.compare(password, data[0].password, (err, result) => {


                // data = await user.findAll({
                //     where: {
                //         email: email,
                //         password: password
                //     }
                // })

                // if (data.length>=1) {
                if (result === true) {
                    
                    res.status(201).json({ Message: "User login sucessful", success: "true", token: generateToken(data[0]._id, false) });

                }
                else {
                    res.status(401).json({ Error: "User not authorized", success: "false" });
                }

            });
        }
        else {
            res.status(404).json({ Error: "User not found", success: "false" });
        }


    } catch (err) {
        res.status(500).json({ Error: err, success: "false" });
    }
}


var getPage = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "view", "signUp.html"));
    } catch (err) {
        res.status(500).json({ Error: err });
    }

}

var postSignUpEntry = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;


        if (!name) {
            throw new Error("Filed Name required");
        } else {
            if (!email) {
                throw new Error("Filed Email required");
            } else {

                if (!password) {
                    throw new Error("Filed Password required");
                }
            }

            const saltRounds = 10;
            const pass = await bcrypt.hash(password, saltRounds)

            //changing to nosql
            // const data = await user.create({
            const data = new User({
                name: name,
                email: email,
                password: pass,
                ispremiumuser: false,
                orders: [],
                totalExpense: 0,
                expenses: [],
                fileDownloaded: [],
                forgotPasswordRequests: []
            })
            data.save();
            res.status(201).json({ NewUser: data, success: "true" });
        }
    } catch (err) {
        res.status(500).json({ Error: err, success: "false" });
    }
}

var forgotCredentials = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "view", "forgotPassword.html"));
    } catch (err) {
        res.status(500).json({ Error: err });
    }
}

var forgotPassword = async (req, res, next) => {
    try {

        console.log("inside forgot password");
        const email = req.body.emailId;

        const currUser = await user.findOne({
                email: email
        })
        console.log(currUser)
        const uniqueId = uuidv4();;
        let newforgotUser= await forgotPasswordRequests.create({
            id: uniqueId,
            userId: currUser._id,
            isactive: true,
        })

        currUser.forgotPasswordRequests.push({forgotPasswordRequestsId:newforgotUser._id})
        const message = process.env.HOST_IPADDRESS + '/password/resetpassword/' + newforgotUser._id.toString();
        
        console.log("message", message);

        console.log("email", email);
        mail.sendMails(email, message);

        res.status(200).json({ message: "Password Resetting mail sent", success: "true" });


    } catch (error) {
        res.status(500).json({ Error: error });
    }
}



var resetPassword = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        const userFound = await forgotPasswordRequests.findOne({
                _id: id,
                isactive: true
            });
        
        console.log("userFound",userFound)
        if (userFound) {
            res.sendFile(path.join(__dirname, "..", "view", "resetPassword.html"))
        } else {
            throw new Error('No User Found with this email');
        }


    } catch (error) {
        res.status(500).json({ Error: error });
    }
}

var updatePassword = async (req, res, next) => {
    try {
        console.log("inside update password")
        let email = req.body.email;
        let password = req.body.password;

        const userFound = await user.findOne({
                email: email
        });

        console.log("userFound",userFound)

        if (userFound) {
            const resetUserFound = await forgotPasswordRequests.findOne({
                    userId: userFound._id,
                    isactive:true
            });
            console.log("resetUserFond",resetUserFound)
            resetUserFound.isactive=false;
            await resetUserFound.save();


            let saltRounds = 10;
            let newPassword = await bcrypt.hash(password, saltRounds);
            userFound.password=newPassword;
            await userFound.save();

            res.status(200).json({ Message: "Password has been updated", success: true });
        }
        else {
            throw new Error('No User Found with this email');
        }

    } catch (error) {
        res.status(500).json({ Error: error });
    }

}

module.exports = {
    generateToken,
    getLoginPage,
    loginUser,
    getPage,
    postSignUpEntry, forgotCredentials, forgotPassword, resetPassword, updatePassword
}