var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

class NotificationService {
    constructor(){
     //console.log("entered constructor of send mail");
    }

    async sendPushToAllAndroidDevices(registrationIds, data) {
        var FCM = require('fcm-notification')
        var pathFCM = __dirname + '/../assets/push_android.json'
        var fcm = new FCM(pathFCM)

        new Promise((resolve, reject) => {
            try {
            let dataToSend = JSON.parse(JSON.stringify(data))
            var message = {
                data: { content: JSON.stringify(dataToSend) }
            }
            var tokens = []
            registrationIds.forEach(token => {
                tokens.push(token.deviceToken)
            });
        
            fcm.sendToMultipleToken(message, tokens, function (
                err,
                response
            ) {
                if (err) {
                    console.log('Something has gone wrong for Android!')
                    console.log('err')
                    reject(err)
                } else {
                    console.log(response)
                    resolve(response)
                }
            })
            } catch (error) {
                reject(error)
                console.log(error)
            }
        })
    }

    async sendMail(email,subject,message){

        if(config.mailService=='GMAIL'){
            var nodemailer = require('nodemailer');
            var smtpTrans = nodemailer.createTransport({
                service: config.mail.service,
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                user: config.mail.userName,
                pass: config.mail.password
                }
            });
            
            var mailOptions = {
                to: email,
                from: config.activationMailTemplate.from,
                subject: subject,
                html: message
            }; 
            smtpTrans.sendMail(mailOptions, function(err) {
                console.log("err sendmail", err);
                return err;
            });
        }else if(config.mailService=='SENDGRID'){
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(config.sendGrid.sendGrid_api_key);
            const msg = {
                to: email,
                from: config.activationMailTemplate.from,
                subject: subject,
                html: message,
            };
            
            sgMail
            .send(msg)
            .then(() => {}, error => {
                console.log("err sendmail", error);
                return error;
            });
        }
    }
}
module.exports=NotificationService;