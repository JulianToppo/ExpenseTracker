// const { UniqueConstraintError } = require('sequelize');
// const Sequelize= require('sequelize');
// const sequelize= require('../util/database');

// const expense= sequelize.define('expense',{
//          id:{
//             type: Sequelize.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true,
        
//         },
//         expenseAmount:{
//             type: Sequelize.INTEGER,
//             allowNull: false
//         },
//         description:{
//             type: Sequelize.TEXT,
//             allowNull: false

//         },
//         category:{
//             type: Sequelize.TEXT,
//             allowNull: false

//         }
//     }
// );

const { default: mongoose } = require('mongoose');
const Schema=mongoose.Schema;

let expenseSchema=new Schema({
    expenseAmount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
   
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

})

let expense= mongoose.model('Expense',expenseSchema);
module.exports= expense;