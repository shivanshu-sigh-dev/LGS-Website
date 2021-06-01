const nodemailer = require('nodemailer');

class Mailer {
    constructor(name, userSubject, from, message){
        this.name = name;
        this.userSubject = userSubject;
        this.from = from;
        this.message = message;
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'infra@labyrinthglobalsolutions.com',
                pass: ''
            }
        });
    }

    getMailOptions(){
        return {
            from: this.from,
            to: 'meeran.maqsusi@labyrinthglobalsolutions.com,shivanshu.singh@labyrinthglobalsolutions.com',
            subject: 'Customer Enquiry',
            html: `<p>Hello There!</p><p>We got an enquiry from <b>${this.name}</b> with email ID: ${this.from}</p><p>The person wants some clarification regarding: <b>${this.userSubject}</b> and the message is given below.</p><p>${this.message}</p>`
        };
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