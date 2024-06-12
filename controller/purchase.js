const Razorpay = require('razorpay');
const Order = require('../model/order')

exports.purchasePremium = async(req,res,next) => {
    try{
        var rzp = new Razorpay({
            key_id : 'rzp_test_qcNXpdKVPBONBS',
            key_secret : 'EIUGX2FpD4j15pArfKu4VyNz'
        })
        const amount = 2500;

        rzp.orders.create({amount, currency:"INR"},(err, order) => {
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({order_id:order.id, status:'PENDING'})
            .then(() => {
                return res.status(201).json({order, key_id : rzp.key_id})
            })
            .catch(err => {
                throw new Error(err)
            })
        })


    }

    catch(err){
        console.log(err);
        res.status(403).json({message:'Something went wrong',error:err})
    }
}

exports.updateStatus = async (req,res,next) => {
    try{
    const {payment_id, order_id,status} = req.body;
    const isPremium = null;
    if(status == 'SUCCESSFUL'){
        isPremium = true;
    }
    else{
        isPremium = false;
    }
    const order = await Order.findOne({where:{order_id:order_id}})
    const promise1 = order.update({payment_id:payment_id,status:status})
    const promise2 = req.user.update({isPremiumUser:isPremium});
    Promise.all([promise1,promise2])
    .then(() => {
        return res.status(202).json({success:true,message:'Transaction successful'})
    })
    .catch(err => {
        throw new Error(err);
    })
    

    }
    catch(err){
        console.log(err)
    }
}
