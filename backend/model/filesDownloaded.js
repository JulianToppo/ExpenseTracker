// const Sequelize= require('sequelize')
// const sequelize = require('../util/database')

// const fileDownloaded= sequelize.define('fileDownloaded',{
//     id:{
//         type : Sequelize.INTEGER,
//         primaryKey : true,
//         autoIncrement : true,
//         allowNull : false,
//     },
//     fileURL:{
//         type : Sequelize.STRING,
//         allowNull: false
//     }

// })

const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;

let fileDownloadedSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileURL: {
        type: String,
        required: true
    }

})

let fileDownloaded = mongoose.model('fileDownloaded', fileDownloadedSchema);

module.exports= fileDownloaded;