const User = require('../model/user');
const Expense = require('../model/expense');

exports.getLeaderboard = async (req,res,next) => {
    try{
        const users = await User.findAll();
        const expenses = await Expense.findAll();

        const userAggregatedExpense = {};
        expenses.forEach((expense) => {
            if(userAggregatedExpense[expense.userId]){
                userAggregatedExpense[expense.userId] += expense.amount;
            }
            else{
                userAggregatedExpense[expense.userId] = expense.amount;
            }
        })
        var userLeaderboardDetails = [];
        users.forEach((user) => {
            userLeaderboardDetails.push({name:user.name, total_expense : userAggregatedExpense[user.id] || 0})
        })
        userLeaderboardDetails.sort((a,b) => b.total_expense - a.total_expense);
        res.status(200).json(userLeaderboardDetails);

    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}