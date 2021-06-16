const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const Mailer = require('./utils/Mailer');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

const options = {
    key: fs.readFileSync(__dirname + '/ssl/custom.key'),
    cert: fs.readFileSync(__dirname + '/ssl/www_labyrinthglobalsolutions_com.crt'),
};

const app = express();

const server = https.createServer(options, app).listen(443, () => {
    console.log("Server is listening on port 443");
});

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/quote', (req, res) => {
    res.sendFile(__dirname + "/Get-Quote.html");
});

app.get('/siemens-polarion', (req, res) => {
    res.sendFile(__dirname + "/siemens-polarion.html");
});

app.get('/siemens-mendix', (req, res) => {
    res.sendFile(__dirname + "/siemens-mendix.html");
});

app.get('/polarion-alm', (req, res) => {
    res.sendFile(__dirname + "/polarion-alm.html");
});

app.get('/saas-cloud', (req, res) => {
    res.sendFile(__dirname + "/saas-cloud.html");
});

app.get('/ptc-integrity', (req, res) => {
    res.sendFile(__dirname + "/ptc-integrity.html");
});

app.get('/web-development', (req, res) => {
    res.sendFile(__dirname + "/web-development.html");
});

app.get('/mendix', (req, res) => {
    res.sendFile(__dirname + "/mendix.html");
});

app.get('/polarion-training', (req, res) => {
    res.sendFile(__dirname + "/polarion-training.html");
});

app.get('/polarion-training', (req, res) => {
    res.sendFile(__dirname + "/polarion-training.html");
});

app.get('/mendix-training', (req, res) => {
    res.sendFile(__dirname + "/mendix-training.html");
});

app.get('/integration', (req, res) => {
    res.sendFile(__dirname + "/integration.html");
});

app.get('/custom-plugins', (req, res) => {
    res.sendFile(__dirname + "/custom-plugins.html");
});

app.get('/templates', (req, res) => {
    res.sendFile(__dirname + "/templates.html");
});

app.get('/FAQ', (req, res) => {
    res.sendFile(__dirname + "/FAQ.html");
});

app.get('/linkedin', (req, res) => {
    res.send(`<html><body></body><script>const a = document.createElement("a"); a.setAttribute('href', 'https://www.linkedin.com/company/labyrinth-global-solutions/posts/?feedView=all&viewAsMember=true'); document.body.appendChild(a); a.click(); a.remove();</script></html>`);
});


app.get('/customers', (req, res) => {
    res.sendFile(__dirname + "/customers.html");
});

app.get('/lgslinkedin', (req, res) => {
    res.send(`<html><body></body><script>const a = document.createElement("a"); a.setAttribute('href', 'https://www.linkedin.com/company/labyrinth-global-solutions'); document.body.appendChild(a); a.click(); a.remove();</script></html>`);
});

app.get('/lgstwitter', (req, res) => {
    res.send(`<html><body></body><script>const a = document.createElement("a"); a.setAttribute('href', 'https://twitter.com/SolLabyrinth'); document.body.appendChild(a); a.click(); a.remove();</script></html>`);
});

app.get('/skype', (req, res) => {
    res.send(`<html><body></body><script>const a = document.createElement("a"); a.setAttribute('href', 'im:skype:ron7038804939?add'); document.body.appendChild(a); a.click(); a.remove();</script></html>`);
});

app.get('/privacy', (req, res) => {
    res.sendFile(__dirname + "/Privacy.html");
});

app.get('/thanks', (req, res) => {
    res.sendFile(__dirname + "/thanks.html");
});

app.post('/sendMail', (req, res) => {
    const newEmail = new Mailer(req.body, false);
    if(newEmail.triggerMail()){
        res.send("failed");
    } else {
        res.send("success");
    }
});

app.post('/quote', (req, res) => {
    if(req.body.name === '' || req.body.from === '' || req.body.sub === '' || req.body.msg === '' || req.body.company === ''){
        res.send("invalid");
    } else {
        const newEmail = new Mailer(req.body, true);
        if(newEmail.triggerMail()){
            res.send("failed");
        } else {
            res.send("success");
        }
    }
});

//  app.listen(8080, () => {
//  	console.log("Server started on port 8080");
//  });
