/*
account: { //Not using camel case because user may see these keys
    KFS:'',
    Name:'',
    Department:'',
    Address:'',
    Phone:'',
    Email:''
},

request: {
    Type:'',
    CostEstimate:0,
    TFSUnit:'',
    Description:'',
    MakeModel: '',
    Location: ''
},

contact: {
    Name:'',
    Phone:'',
    Email:''
},
*/
function verify(data) {
    for (let value in data.account) {
        if (data.account[value] == '') return `Missing Account ${value}.`
    }
    
    for (let value in data.request) {
        if (value === 'MakeModel' && data.request.TFSUnit==='mechanical') continue
        if (data.request[value] == '') return `Missing Request Detail ${value}.`
    }
    for (let value in data.contact) {
        if (data.contact[value] == '') return `Missing Contact ${value}.`
    }
    return 0
}
module.exports = verify;