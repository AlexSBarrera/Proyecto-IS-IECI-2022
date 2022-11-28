const MsmBoard = require('../models/MsmBoard');
const User = require('../models/user');
const nodeMailer = require('nodemailer');

app.getMessage = (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
      if(err)
        sendStatus(500);
      res.sendStatus(200);
    })
}

app.CreateMessage = (req, res) => {
    const {Message, Date} = req.body;
    const newMsm = new Message({
        Message,
        Date
    });
    newMsm.save((err, MsmBoard) => {
        if (err) {
            return res.status(400).send({ message: "El Post no se ha podido crear" })
        }
        return res.status(201).send(MsmBoard)
    });
}

app.postEmail = (req, res) => {
    const {name, email, message} = req.body;
    var transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "rafaela.grady74@ethereal.email",
            pass: "8Yk9dseMmvhA5yEReC"
        }
    });
    var mailOptions = {
        from: "Remitente",
        to: "Benjacaniu47@gmail.com",
        subject: "Correo de prueba",
        text: "Hola mundo"
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado");
            res.status(200).jsonp(req.body);
        }
    });
}
