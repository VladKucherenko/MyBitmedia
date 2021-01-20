const { where } = require("../db");
const knex = require("../db");

exports.usersList = async (req, res) => {

    let { page = 1, count = 10 } = req.query;

    if (Number.isInteger(parseInt(page)) && Number.isInteger(parseInt(count))) {
        let lowerLimit = page * count - count + 1;
        let higherLimit = page * count;

        await knex.select('users.id', 'users.first_name',
            'users.last_name', 'users.email', 'users.gender',
            'users.ip_address')
            .sum('usersStatistics.page_views as totalPageViews')
            .sum('usersStatistics.clicks as totalClicks')
            .from('users')
            .join('usersStatistics', 'users.id', '=', 'usersStatistics.user_id')
            .groupBy('users.id')
            .whereBetween('id', [lowerLimit, higherLimit])
            .then((userData) => {
                // console.log(userData);
                res.json({ userData, resultCode: 0 })
            })
            .catch(err => {
                res.json({ message: `There was an error retrieving data: ${err}`, resultCode: 1 })
            })
    } else {
        console.log('Params are incorrect')
        return res.status(400).json({ message: `Incorrect query params`, resultCode: 1 })
    }
}

//2019-10-29
// /bitmedia/user/:id
exports.usersStatistic = async (req, res) => {

    let { from = '2019-10-02', to = '2019-10-30' } = req.query;
    let { id } = req.params;
    if(validateDate(from) && validateDate(to)){
        await knex
        .select('*')
        .from('usersStatistics')
        .where('user_id', id)
        .orderBy('date', 'asc')
        .whereBetween('date', [from, to])
        .then(userData => {
            // let beginDate = userData[0].date
            // let lastDate = userData[userData.length - 1].date
            res.json({ userData, resultCode: 0})
        })
        .catch(err => {
            res.json({ message: `There was an error retrieving data: ${err}`, resultCode: 1 })
        })
    } else{
        // console.log('Params are incorrect')
        return res.status(400).json({ message: `Incorrect query params`, resultCode: 1 })
    }
}

Date.prototype.isValid = function () {
    return this.getTime() === this.getTime();
};
const validateDate = (date) => {
    let newDate = new Date(date);
    return newDate.isValid()
}
//2019-10-29