
const express= require('express');

const router= express.Router();

const purchaseController= require("../controller/purchasePremium");
const authorization =require('../middleware/authorization');

router.get("/checkPremium",authorization.authorizationUser,purchaseController.checkIfPremium);
router.get("/premiummembership",authorization.authorizationUser,purchaseController.purchasepremium);
router.post("/updatetransactionstatus",authorization.authorizationUser,purchaseController.updateTransactionStatus);

module.exports=router;