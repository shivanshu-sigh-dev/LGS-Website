const nodemailer = require('nodemailer');

class Mailer {
    constructor(userData, isQuote){
        this.name = userData.name;
        this.userSubject = userData.sub;
        this.from = userData.from;
        this.message = userData.msg;
        this.isQuote = isQuote;
        this.phone = userData.phone;
        this.company = userData.company;
        this.website = userData.website;
        this.servicesReq = userData.services;
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'infra@labyrinthglobalsolutions.com',
                pass: '@Lgs1nfraTe@m'
            }
        });
    }

    getMailOptions(){
        if(this.isQuote){
            return {
                from: this.from,
                to: 'meeran.maqsusi@labyrinthglobalsolutions.com,shivanshu.singh@labyrinthglobalsolutions.com',
                subject: 'Customer Quote Inquiry',
                html: `<p>Hello There!</p><p>We got a quotation inquiry from <b>${this.name}</b> with email ID: ${this.from}</p><p>Quotation Form Details</p><table border="1" cellspacing="0" cellpadding="5"><thead><tr><th>Question</th><th>Answer</th><tr></thead><tbody><tr><td>Full Name</td><td>${this.name}</td></tr><tr><td>Phone</td><td>${this.phone}</td></tr><tr><td>Subject</td><td>${this.userSubject}</td></tr><tr><td>Query</td><td>${this.message}</td></tr><tr><td>Website</td><td>${this.website}</td></tr><tr><td>Services Required</td><td>${this.servicesReq}</td></tr></tbody></table><p><b>Thank you!</b></p>`
            }
        } else {
            return {
                from: this.from,
                to: 'meeran.maqsusi@labyrinthglobalsolutions.com,shivanshu.singh@labyrinthglobalsolutions.com',
                subject: 'Customer General Inquiry',
                html: `<p>Hello There!</p><p>We got an inquiry from <b>${this.name}</b> with email ID: ${this.from}</p><p>The person wants some clarification regarding: <b>${this.userSubject}</b> and the message is given below.</p><p>${this.message}</p><p><b>Thank you!</b></p>`
            };
        }
    }

    triggerMail(){
        this.transporter.sendMail(this.getMailOptions(), (error, info) => {
            if(error){
                return true;
            } else {
                return false;
            }
        });
    }
};

module.exports = Mailer;