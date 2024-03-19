
const express= require('express');
const authorization = require('../middleware/authorization')
const premiumfeatures = require('../controller/premiumController')
const router=express.Router();

router.get("/premium/showLeaderBoard",authorization.authorizationUser,premiumfeatures.getUserLeaderBoard)

module.exports=router;