// const { UniqueConstraintError } = require('sequelize');
// const Sequelize= require('sequelize');
// const sequelize= require('../util/database');

// const User= sequelize.define('registeredUser',{
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull: false
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password:{
//         type:Sequelize.STRING,
//         allowNull: false
//     },
//     ispremiumuser :Sequelize.BOOLEAN ,
//     totalExpense : {
//         type:Sequelize.INTEGER,
//         defaultValue:0
//     }
// })

const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    ispremiumuser: {
        type: Boolean,
        required: true
    },
    totalExpense: {
        type: Number,
        required: true
    },
    expenses: [{
        expenseId: {
            type: Schema.Types.ObjectId,
            ref: 'Expense',
            required: true
        }
    }],
    orders: [
        {
            orderId: {
                type: Schema.Types.ObjectId,
                ref: 'Order',
                required: true
            }
        }
    ],
    forgotPasswordRequests: [
        {
            forgotPasswordRequestsId: {
                type: Schema.Types.ObjectId,
                ref: 'forgotPasswordRequests',
                required: true
            }
        }
    ],
    fileDownloaded: [
        {
            fileDownloadedId: {
                type: Schema.Types.ObjectId,
                ref: 'fileDownloaded',
                required: true
            }
        }
    ]

})


userSchema.methods.deleteExpenseEntry = function (expenseId) {

    let filteredExpenses = this.expenses.filter((expense) => {
        return expense.expenseId.toString() != expenseId.toString();
    })

    this.expenses = filteredExpenses;
    return this.save();

}


let User = mongoose.model('User', userSchema);
module.exports = User;