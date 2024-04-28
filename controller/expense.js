const Expense = require('../model/expense');

exports.addExpense = async (req,res,next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    try{
        const expense = await Expense.create({
            amount:amount,
            description:description,
            category:category
        }) 

        res.json(expense);
    }
    catch(err){
        console.log(err);
    }
}

exports.getExpenses = async (req,res,next) => {
    try{
    let expenses = await Expense.findAll();
    res.json(expenses);

    }
    catch(err){
        console.log(err)
    } 
}

exports.deleteExpense = async (req,res,next) => {
    const expense_id = req.params.id;

    try{
        let result = await Expense.findOne({where:{id:expense_id}});
        result.destroy();
        res.json({message:"Expense Deleted"});
    }

    catch(err){
        console.log(err);
    }
}