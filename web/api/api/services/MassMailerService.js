var async = require("async");
var http = require("http");
var config = require('../../config/environment');
var nodemailer = require("nodemailer");
// This will store emails needed to send.
let listofemails = []; 
// Will store email sent successfully.
let success_email = [];
// Will store email whose sending is failed. 
let failure_email = [];
var transporter;
var User = require('./../user/user.model');
var subject;
var template;

/* Loading modules done. */
class MassMailerService {


     constructor(recepients, mailSubject, templateMessage) {
        console.log("(constructor===="+ recepients);
        console.log("(listofemails===="+ listofemails);
        var self = this;
        subject = mailSubject;
        template = templateMessage;
        transporter = nodemailer.createTransport({
            service: config.mail.service,
            auth: {
                user: config.mail.userName,
                pass: config.mail.password
            },
            tls: { rejectUnauthorized: false },
            debug: true
        });
        // Fetch all the emails from database and push it in listofemails
        if(recepients === 'all'){
            User.find().select('email -_id')
                .then(function(emails) {
                    console.log(emails);
                    listofemails = self.getValues(emails,"email");
                    self.invokeOperation(listofemails);
                    console.log("List of Emails =="+listofemails);
                    })
                  .catch(function(err) {
                   console.log(err);
                   return null;
                  });
        }
        if(recepients === 'active'){
            User.find({isActive:true}).select('email -_id')
                .then(function(emails) {
                    console.log(emails);
                    listofemails = self.getValues(emails,"email");
                    self.invokeOperation(listofemails);
                   })
                  .catch(function(err) {
                   console.log(err);
                   return null;
                  });
        }if(recepients === 'subscribed'){
            User.find({isActive:true,subscribedToEmails:true}).select('email -_id')
                .then(function(emails) {
                    console.log(emails);
                    listofemails = self.getValues(emails,"email");
                    self.invokeOperation(listofemails);
                   })
                  .catch(function(err) {
                   console.log(err);
                   return null;
                  });
        }
        console.log("List of Emails =="+listofemails);
    }

    getValues(input, field) {
        var output = [];
        for (var i=0; i < input.length ; ++i){
            output.push(input[i][field]);
        }
        console.log("output==="+output);
        return output;
    }
    /* Invoking email sending operation at once */
    invokeOperation(listofemails) {
        var self = this;
        console.log("listofemails======invokeOperation===="+listofemails)
        async.each(listofemails, self.SendEmail,function () {
            console.log(success_email);
            console.log(failure_email);
        });
    }
    /*
    * This function will be called by multiple instance.
    * Each instance will contain one email ID
    * After successfull email operation, it will be pushed in failed or success array.
    */
    SendEmail(Email,callback) {
        console.log("Sending email to " + Email);
        console.log("SendEmail ====subject====" + subject);
        console.log("SendEmail ====template=== " + template);
        var self = this;
        var status = false;
        // waterfall will go one after another
        // So first email will be sent
        // Callback will jump us to next function
        // in that we will update DB
        // Once done that instance is done.
        // Once every instance is done final callback will be called.
        async.waterfall([
            function (callback) {
                console.log("callback ====subject====" + subject);
                console.log("callback ====template=== " + template);
                var sub = subject;
                var mailTemplate = template;
                var mailOptions = {
                    from: "shivaprasadcs@gmail.com",
                    to: Email,
                    subject: sub,
                    text: mailTemplate
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        failure_email.push(Email);
                    }
                    else {
                        status = true;
                        success_email.push(Email);
                    }
                    callback(null, status, Email);
                });
            },
            function (statusCode, Email, callback) {
                console.log("Will update DB here for " + Email + "With " + statusCode);
                callback();
            }
        ], function () {
            //When everything is done return back to caller.
            console.log("Failure Email List ==" +failure_email);
            console.log("Success Email List ==" +success_email);
            callback();
        });
    }
}

module.exports=MassMailerService;


