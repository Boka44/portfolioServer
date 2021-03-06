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
	let text = `Hello ${name},\n\n Welcome to Barjoker! The game where you put your friends in uncomofortable situations, for fun!
	\n\nMy name is Boka, the creator of Barjoker, and I would like to welcome you personally. 
	\n\nThe current version is a prototype, version 0.1.0, so expect more features soon. If you have any questions, reply to this email and I will get back to you personally.
	\n\n\nCheers!
	\n\nBoka`;
	let html = `<h3>Hello ${name},</h3>
					<br>
					<p>Welcome to Barjoker! The game where you put your friends in uncomofortable situations, for fun!</p>
					<br>
					<p>My name is Boka, the creator of Barjoker, and I would like to welcome you personally.</p>
					<br>
					<p>The current version is a prototype, <em>version 0.1.0</em>, so expect more features soon. If you have any questions,
	reply to this email and I will get back to you personally.</p>
					<br>
					<h4>Cheers</h4>
					<br>
					<h3><strong>Boka</strong></h3>`;

	
  // const from = name && email ? `${name} <${email}>` : `${name || email}`
  let mailOptions = {
    from: 'nhrboka@aol.com',
    to: `${email}`,
    subject: `Welcome to Barjoker!`,
    text,
    html
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