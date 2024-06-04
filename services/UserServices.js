exports.getExpenses = (req,attributes) => {
    return req.user.getExpenses({
        attributes:attributes
    })
}

