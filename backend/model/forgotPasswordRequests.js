// const Sequelize= require('sequelize');
// const sequelize = require('../util/database');

// const forgotPasswordRequests= sequelize.define('forgotPasswordRequests',{
//     id:{
//         type: Sequelize.UUID,
//         primaryKey: true,
//         allowNull: false,
//         defaultValue: Sequelize.UUIDV4,
//     },
//     userId:{
//         type:Sequelize.INTEGER
//     },
//     isactive:{
//         type: Sequelize.BOOLEAN
//     }
// })


const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;

let forgotPasswordRequestsSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isactive: {
        type: Boolean,
        required: true
    }

})

let forgotPasswordRequests = mongoose.model('forgotPasswordRequests', forgotPasswordRequestsSchema);

module.exports = forgotPasswordRequests