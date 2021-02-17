const express = require('express')
const bodyParser = require('body-parser')

const nodemailer = require("nodemailer");

const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello bruhhhh!')
})

app.post('/', async (req, res) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'SENDER@gmail.com', // here use your real email
          pass: 'PASSWORD' // put your password correctly (not in this question please)
        }
      });
    
    const msg = {
        from: 'SENDER@gmail.com', // sender address
        to: `RECEIEVER@gmail.com`, // list of receivers
        subject: "Sup", // Subject line
        text: "Long time no see", // plain text body
    }
    // send mail with defined transport object
    const info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
    res.send('Email Sent!')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:3000`))
