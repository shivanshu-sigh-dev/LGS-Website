const express = require('express');
const bodyParser = require('body-parser');
const Mailer = require('./utils/Mailer');

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/sendMail', (req, res) => {
    const newEmail = new Mailer(req.body.name, req.body.sub, req.body.from, req.body.msg);
    if(newEmail.triggerMail()){
        res.send("failed");
    } else {
        res.send("success");
    }
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
})