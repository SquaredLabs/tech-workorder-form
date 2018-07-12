const { Router } = require('express')
var fs = require('fs'); 
var path =require('path')

fs.writeFile(path.join(__dirname,'../../WorkOrders.db'), '', { flag: 'wx' }, function (err) {
    if(err)console.log(err)
    else console.log("Created WorkOrder.db");
});

const router = Router()

const dbHandler = require('../../lib/WONumberGen')
const emailer = require('../../lib/emailer')
const verifyForm = require('../../lib/verifyForm')

/* GET users listing. */
router.post('/submit', function (req, res, next) {
    let data = req.body;
    let errMsg = verifyForm(data)
    console.log(errMsg)
    if (errMsg != 0) {
        res.send(errMsg)
        return
    }

    dbHandler((err, max) => {
        if (err) console.error(err);
        data.WorkOrderNumber = max;
        emailer(data)
        res.send('Success! You will get a confirmation email for your work order.')
    })
    

})

module.exports = router