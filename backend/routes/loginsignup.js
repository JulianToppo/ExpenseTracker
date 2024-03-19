

const express= require('express');

const router=express.Router();

const loginSignUpController = require('../controller/loginSignUpController')

router.get("/",loginSignUpController.getLoginPage);
router.get("/signUp",loginSignUpController.getPage);
router.post("/user/post",loginSignUpController.postSignUpEntry);
router.post("/login",loginSignUpController.loginUser);
router.get("/forgotPassword",loginSignUpController.forgotCredentials);
router.post("/called/password/forgotpassword",loginSignUpController.forgotPassword);

router.get("/password/resetpassword/:id",loginSignUpController.resetPassword);
router.post("/password/updatePassword",loginSignUpController.updatePassword);



module.exports=router;