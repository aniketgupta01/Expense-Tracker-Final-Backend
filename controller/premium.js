const User = require('../model/user');
const Expense = require('../model/expense');
const sequelize = require('../util/database');

exports.getLeaderboard = async (req,res,next) => {
    try{
        const leaderboard = await User.findAll({
            attributes:['name','totalExpense'],

            order:[['totalExpense','DESC']]
        });

        res.status(200).json(leaderboard);

    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}