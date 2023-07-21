

const Order = require('../model/order')
const loginSignUpController = require('./loginSignUpController')
const Razorpay = require('razorpay');

const purchasepremium =async (req, res) => {
    try {
        console.log("purchase premium entered");
       // console.log("cwd",process.env.RAZORPAY_KEY_ID);
        // console.log("environment",process.env);

        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                throw new Error(JSON.stringify(err));
            }
            console.log("razorpay order")
            Order.create({userId:req.user._id,paymentid:'', orderid: order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Something went wrong', error: err})
    }
}

 const updateTransactionStatus = async (req, res ) => {
    try {
        console.log("update Transaction")
        const userId = req.user._id;
        const { payment_id, order_id} = req.body;
        const order  = await Order.findOne({ orderid : order_id}) 
        const promise1 =  await order.updateOne({ paymentid: payment_id, status: 'SUCCESSFUL'}) 
        const promise2 =await   req.user.updateOne({ ispremiumuser: true }) ;

        Promise.all([promise1, promise2]).then(()=> {
            return res.status(202).json({success: true, message: "Transaction Successful", token: loginSignUpController.generateToken(userId,true) });
        }).catch((error ) => {
            throw new Error(error)
        })

        
                
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: err, message: 'Something went wrong' })

    }
}

var checkIfPremium = async (req,res,next)=>{
    try {
        console.log("Check premium method");
     
       // const userId = req.user.id;
        
        if(req.user.ispremiumuser){
            res.status(202).json({success: true});
        }
    } catch (err) {
        res.status(403).json({ error: err, message: 'Not a premium user' })
    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus,
    checkIfPremium
}