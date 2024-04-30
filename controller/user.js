const User = require('../model/user');
const sequelize = require('../util/database')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateToken(id,name){
   return jwt.sign({userId:id,name:name},'secretkey');
}

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

        bcrypt.hash(password, 10, async(err, hash) => {
            console.log(err);
            await User.create({
                name:name,
                email:email,
                password:hash
            })
           return res.status(200).json("User created.")
        })

        

       }else{
       res.status(204).send();
    }

    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}

exports.loginUser = async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
    const user = await User.findAll({where : {email:email}})

    if(user.length>0){
        bcrypt.compare(password, user[0].password, (err,result) => {
            if(err){
                throw new Error('Something went wrong');
            }
            if(result === true){
                const token = generateToken(user[0].id,user[0].name)
                return res.status(200).json({message:'success',token:token});
            }
            else{
                res.status(400).json({message:'wrong password'})
            }
        })
    }
    else{
        res.status(404).json({message:'user not found'});
    }

    
    }       
    catch(err){
        console.log(err);
    }
}

