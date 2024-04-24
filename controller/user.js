const User = require('../model/user');
const sequelize = require('../util/database')

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

exports.loginUser = async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findAll({
        where:{
            email:email
        }
    })

    try{
        if(user.length == 0){
           return res.status(404).json({message:'not found'})
        }
        else{
            const result = await User.findAll({
                where:{
                    email:email,
                    password: sequelize.where(
                        sequelize.fn('BINARY', sequelize.col('password')),
                        password
                      )
                }
            })
            if(result.length == 0){
                return res.status(401).json({message:'wrong password'});
            }
            else{
                res.status(200).json({message:'success'});
            }
        }

    }
    catch(err){
        console.log(err);
    }
}