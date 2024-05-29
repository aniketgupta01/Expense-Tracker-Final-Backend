const Sib = require("sib-api-v3-sdk");
const uuid = require("uuid");
const bcrypt = require('bcrypt');

const ForgotPassword = require('../model/forgotpassword');
const User = require('../model/user');

require("dotenv").config();

const client = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];

apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const transactionalEMailApi = new Sib.TransactionalEmailsApi();

exports.forgotPassword = async (req, res, next) => {
  const emailId = req.body.email;
  const id = uuid.v4();
  try {
    const user = await User.findOne({ where: { email: emailId } });
    if (!user) {
        return res.status(404).json({message:"User does not exist!"})
    }
    else{
        await ForgotPassword.create({
            id:id,
            isActive:true,
            userId:user.id
        })
        
    }


    const path = `http://localhost:6500/password/reset-password/${id}`;
    const sender = {
      name: "Expense Tracker - Aniket",
      email: "aniketgupta8088@gmail.com",
    };
    const receivers = [
      {
        email: emailId,
      },
    ];
     
    await transactionalEMailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Expense Tracker : Reset Password",
      htmlContent: `<h2>Reset Password</h2><br>
                    <a href="${path}">Click here to reset password.</a>`,
    });
    res.status(200).json({ message: "Email sent" });

  } 
  catch (err) {

    console.log(err);
    res.status(500).json({ error: err });
  }
};


exports.resetPassword = async(req,res,next) => {
    const id = req.params.id;

    try{
        const request = await ForgotPassword.findOne({where:{id:id}});
        if(!request){
            return res.status(404).send("<h1>Link to reset password not found.</h1>")
        }
        else{
            if(request.isActive){
                res.send(`<html>
                <script>
                    function formsubmitted(e){
                        e.preventDefault();
                        console.log('called')
                    }
                </script>

                <form action="/password/updatePassword/${id}" method="GET">
                    <label for="newpassword">Enter New password</label>
                    <input name="newpassword" type="password" required></input>
                    <button>Reset Password</button>
                </form>
            </html>`)
            res.end();
            }
            else{
                res.status(404).send("<h1>Link has already been used.</h1>")
            }
        }
    }

    catch(err){
        console.log(err)
    }
}

exports.updatePassword = async(req,res,next) => {
    const id = req.params.id;
    const newPass = req.query.newpassword
    try{
        const request = await ForgotPassword.findOne({where:{id:id}});
        await request.update({isActive:false});

        bcrypt.hash(newPass,10,async(err,hash) => {
            if(err){
                throw new Error(err);
            }
            await User.update({password:hash},{where:{id:request.userId}});
            res.status(200).send("<h2>Password successfully changed.</h2>")
        })
    }
    catch(err){
        console.log(err);
    }


}
