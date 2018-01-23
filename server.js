const express = require('express');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const app = express();
const PASSWORD = process.env.PASSWORD;

var nodemailer = require('nodemailer');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'nicholashrboka@gmail.com',
    pass: `${PASSWORD}`
  }
});

app.post('/', function (req, res) {
	res.set({
      'Access-Control-Allow-Origin': '*'
    })
    req.headers['Access-Control-Allow-Origin'] = '*'
	let email = req.body.email;
	let name = req.body.name;
	let text = req.body.text;

  const from = name && email ? `${name} <${email}>` : `${name || email}`
  const mailOptions = {
    from,
    to: 'nicholashrboka@gmail.com',
    subject: `New message from ${from} at portfolio site`,
    text
  };

 transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});

})





app.listen(PORT, function () {
	console.log('Express server is running on port ' + PORT);
}).on('error', err => console.error(err));