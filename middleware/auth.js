const User = require('../model/user');
const jwt = require('jsonwebtoken');

exports.authenticate = async (req,res,next) => {
    const token = req.header('Authorization');

try{
    const userobj = jwt.verify(token,'secretkey');
    const user = await User.findByPk(userobj.userId);
    req.user = user;

    next();


}

catch(err){
    console.log(err);
    return res.status(401).json({success:false})
}
    


}