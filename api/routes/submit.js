const { Router } = require('express')

const router = Router()

const dbHandler = require('../../lib/WONumberGen')
const emailer = require('../../lib/emailer')

/* GET users listing. */
router.post('/submit', function (req, res, next) {
    let data = req.body;
    dbHandler((err, max) => {
        if (err) console.error(err);
        data.WorkOrderNumber = max;
        emailer(data)
    })

})

module.exports = router