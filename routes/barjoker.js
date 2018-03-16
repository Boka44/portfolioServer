const express = require('express');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const app = express();
const PASSWORD = process.env.PASSWORD;

const nodemailer = require('nodemailer');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'AOL',
  auth: {
    user: 'nhrboka@aol.com',
    pass: PASSWORD
  }
});

app.post('/', function (req, res) {
	res.set({
      'Access-Control-Allow-Origin': '*'
    })
    req.headers['Access-Control-Allow-Origin'] = '*'
	let email = req.body.email;
	let name = req.body.name;
	let text = `Hello ${name},\n\n Welcome to Barjoker!`;
	

  const from = name && email ? `${name} <${email}>` : `${name || email}`
  const mailOptions = {
    from: 'nhrboka@aol.com',
    to: email,
    subject: `Welcome to Barjoker!`,
    text
  };

 transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({message: error});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({message: info.response});
    };
  });

})

module.exports = app;