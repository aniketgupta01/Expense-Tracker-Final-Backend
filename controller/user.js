const User = require('../model/user');

exports.addUser = async (req,res,next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try{
      const user = await User.findAll({
        where:{
            email:email
        }
       })
       if(user.length==0){

        const data = await User.create({
            name:name,
            email:email,
            password:password
        })
        return res.send("User created.")

       }
       res.status(204).send();

    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}