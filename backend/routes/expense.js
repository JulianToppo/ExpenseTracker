
const express= require('express');

const router= express.Router();

const expenseController= require("../controller/expenseController");
const authorization =require('../middleware/authorization');

router.get("/",expenseController.getExpensePage);
router.post("/addExpense",authorization.authorizationUser,expenseController.addExpense);
router.get("/getExpense/pageNo/:pageNo/:rowCount",authorization.authorizationUser,expenseController.getExpense);

router.delete("/:expenseId",authorization.authorizationUser,expenseController.deleteExpense);

// router.get("/showReports",authorization.authorizationUser,expenseController.showReports)
router.get("/user/download",authorization.authorizationUser,expenseController.downloadExpense);
router.get("/getDownloadedFiles",authorization.authorizationUser,expenseController.getDownloadedFiles);


module.exports=router;