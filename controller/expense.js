const Expense = require('../model/expense');

exports.addExpense = async (req,res,next) => {
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
        }) 

        res.json(expense);
    }
    catch(err){
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
    // const userId = req.user.id;

    try{
        let result = await Expense.findOne({where:{id:expense_id}});
        result.destroy();
        res.json({message:"Expense Deleted"});
    }

    catch(err){
        console.log(err);
    }
}