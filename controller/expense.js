const Expense = require('../model/expense');
const User = require('../model/user');
const sequelize = require('../util/database');

exports.addExpense = async (req,res,next) => {
    const t = await sequelize.transaction();
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const userId = req.user.id;

    try{
        const expense = await Expense.create({
            amount:amount,
            description:description,
            category:category,
            userId:userId
        },{transaction:t}) 
        
        let total_expense = Number(req.user.totalExpense)+Number(amount);
        

        const result = await User.update(
        { totalExpense:total_expense},
        {where:{id:userId},transaction:t}
    
    )
    await t.commit();

        res.status(200).json(expense);
    }
    catch(err){
        await t.rollback();
        res.status(500).json({error:err})
        console.log(err);
    }
}

exports.getExpenses = async (req,res,next) => {
    try{
        const userId = req.user.id;
    let expenses = await Expense.findAll({where:{
        userId:userId
    }});
    res.json(expenses);

    }
    catch(err){
        console.log(err)
    } 
}

exports.deleteExpense = async (req,res,next) => {
    const expense_id = req.params.id;
    const userId = req.user.id;

    try{
        let result = await Expense.findOne({where:{id:expense_id}});

        //Updating the totalExpense column
        
        let total_expense = Number(req.user.totalExpense)
        let final_amt = total_expense - result.amount;
        const new_expense = await User.update(
            { totalExpense:final_amt},
            {where:{id:userId}}
        
        )
        
        //Deleting the expense.
        result.destroy();
        res.json({message:"Expense Deleted"});

        
    }

    catch(err){
        console.log(err);
    }
}