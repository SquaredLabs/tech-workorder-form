var email = require("emailjs");
require('dotenv').config()
var server = email.server.connect({
    user: process.env.EMAIL,
    password: process.env.PASS,
    host: process.env.SMTP_HOSTNAME,
    ssl: process.env.SSL
});
function dataToHTML(data, confirmation) {
    
    let account = data.account;
    let request = data.request;
    let contact = data.contact;
    let confirmationText = confirmation ? `Confirmation for Work order ${data.WorkOrderNumber}` :
        `Work order ${data.WorkOrderNumber}`
    return `<html>
        <h2>${confirmationText}</h4>
        <h3>Account Information</h3>
            <p> KFS Number: ${account.KFS}</p>
            <p> Name: ${account.Name}</p>
            <p> Department: ${account.Department}</p>
            <p> Address: ${account.Address}</p>
            <p> Phone: ${account.Phone}</p>
            <p> Email: ${account.Email}</p>
        <h3>Request Information</h3>
            <p> Type: ${request.Type}</p>
            <p> CostEstimate: ${request.CostEstimate}</p>
            <p> TFSUnit: ${request.TFSUnit}</p>
            <p> Description: ${request.Description}</p>
            <p> MakeModel: ${request.MakeModel}</p>
            <p> Location: ${request.Location}</p>
        <h3>Contact Information</h3>
            <p> Name: ${contact.Name}</p>
            <p> Phone: ${contact.Phone}</p>
            <p> Email: ${contact.Email}</p>
    </html>`
}

function sendWOEmail(data, to, confirmation=false) {
    let text = dataToHTML(data, confirmation)
    let subject = confirmation ? `Confirmation for Work Order ${data.WorkOrderNumber}` :
        `Work Order ${data.WorkOrderNumber}`
    let message = {
        text: text,
        from: "Colin McNeil <colin@uconn.edu>",
        to: to,
        cc: "",
        subject: subject,
        attachment:
            [
                { data: text, alternative: true },
            ]
    };
    server.send(message, function (err, message) { console.log(err || 'Message Sent'); });
    
}
function sendEmails(data) {
    let confirmationTo = data.contact;
    sendEmail(data, `${confirmationTo.Name} <${confirmationTo.Email}>`, true)
    sendEmail(data, "Colin McNeil <gpzoghbi@gmail.com>, another <another@your-email.com>")
}
module.exports = sendEmails;


// send the message and get a callback with an error or details of the message that was sent


// you can continue to send more messages with successive calls to 'server.send', 
// they will be queued on the same smtp connection

// or you can create a new server connection with 'email.server.connect' 
// to asynchronously send individual emails instead of a queue