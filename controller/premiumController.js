const User = require('../model/user');
const Expense = require('../model/expense');
const sequelize = require('../util/database');

const getUserLeaderBoard = async (req, res) => {
    try {
        // const leaderboardofusers = await User.findAll({
        //     attributes: ['id', 'name',[sequelize.fn('sum', sequelize.col('expenses.expenseAmount')), 'total_cost'] ],
        //     include: [
        //         {
        //             model: Expense,
        //             attributes: []
        //         }
        //     ],
        //     group:['registeredUser.id'],
        //     order:[['total_cost', 'DESC']]

        // })
        // const leaderboardofusers = await User.findAll({
        //     attributes: ['id', 'name', 'totalExpense'],
        //     order: [['totalExpense', 'DESC']]
        // })

        const leaderboardofusers = await User.find().select('_id name totalExpense')
            .sort({'totalExpense': 'desc'})

            console.log(leaderboardofusers)
        res.status(200).json(leaderboardofusers)

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = {
    getUserLeaderBoard
}