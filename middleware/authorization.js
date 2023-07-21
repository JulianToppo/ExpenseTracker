const path = require("path");
const user = require("../model/user");
const jwt = require('jsonwebtoken');

exports.authorizationUser = async (req, res, next) => {
    try {

       // console.log("header",req.header("Authorization"));
        let token = req.header("Authorization");
        const activeUser = jwt.verify(token, "secretkey");
        console.log("authorization id",activeUser.userID);
        user.findById(activeUser.userID).then(result =>{
         //   console.log("result",result);
            req.user=result;
            next();
        })
    } catch (error) {
        res.status(401).json({success: false});
    }
}