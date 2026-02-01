var env = require('../../config/environment')
const nodemailer = require('nodemailer');
const { renameSync } = require('fs');
const user = env.sesUser
const pass = env.sesPassword
var settingsdata
try {
    settings.findOne()
    .then(async data => {
        settingsdata = (data)
        //console.log(data)
    })
} catch (error) {
}
  const transport = nodemailer.createTransport({
    host: 'mail.somashop.com',
    port: 465,
    auth: {
        user: user,
        pass: pass,
    },
})

class MailService {
    
    constructor(){
        console.log("entered constructor of send mail")
    }

    userMail(to,subject,body,callback)
    {
        let emailContent=`
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
        <meta charset="UTF-8">
        <meta content="width=device-width:intial-scale=1.0;maximum-scale=1.0;user-scalable=no;" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <style>
        @media screen (max-width:630px){
            table{width:100%}
            }
            </style>
     </head>
        <body data-new-gr-c-s-loaded="14.1073.0">
    <div class="es-wrapper-color" style="background-color: #efefef;">
        <!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                <v:fill type="tile" color="#efefef"></v:fill>
            </v:background>
        <![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center" esd-custom-block-id="388982">
                                        <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20" align="left" bgcolor="#ffe54a" esd-custom-block-id="717808">
                                                        <table cellpadding="20" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center">
                                                                        <table cellpadding="10" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image es-p10b" style="font-size: 0px;">
                                                                                        <a target="_blank"><img src="https://jwwryi.stripocdn.email/content/guids/CABINET_224138b5cf3b11ddb673c54b04987c31/images/navlog.png" alt="Logo" style="display: block; font-size: 12px;" width="200" title="Logo" class="adapt-img"></a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table><table cellpadding="0" cellspacing="0" class="es-content" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center">
                                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                        <tbody>
                                        ${body}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center" esd-custom-block-id="717807">
                                    <table class="es-footer-body" align="center" cellpadding="20" cellspacing="0" width="600" style="background-color: transparent;">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure es-p20" align="left" bgcolor="#ffffff" style="background-color: #ffffff;">
                                                    <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="143" valign="top"><![endif]-->
                                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td width="133" class="es-m-p0r es-m-p20b esd-container-frame" align="center">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/17971617974647919.png" alt style="display: block;" width="45"></a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">FREE <br>SHIPPING</p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                                <td class="es-hidden" width="10"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td><td width="143" valign="top"><![endif]-->
                                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td width="133" class="es-m-p20b esd-container-frame" align="center">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/80801617974647921.png" alt style="display: block;" width="45"></a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">EASY <br>PAYMENT</p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                                <td class="es-hidden" width="10"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td><td width="132" valign="top"><![endif]-->
                                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td width="132" align="center" class="esd-container-frame es-m-p20b">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/77861617974647919.png" alt style="display: block;" width="45"></a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUICK <br>RETURN</p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td><td width="10"></td><td width="132" valign="top"><![endif]-->
                                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                        <tbody>
                                                            <tr>
                                                                <td width="132" align="center" class="esd-container-frame">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/59831617975283573.png" alt style="display: block;" width="45"></a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUALITY ASSURANCE</p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left" bgcolor="#d12421" style="background-color: #d12421;">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td width="560" class="esd-container-frame" align="left">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                                                                    <table cellpadding="5" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" valign="top" class="es-p40r">
                                                                                                    <a target="_blank" href="https://www.facebook.com/SomaBlockprints/"><img title="Facebook" src="http://143.110.190.232/assets/images/facebook-logo-white.png" alt="Fb" width="32"></a>
                                                                                                </td>
                                                                                                <td align="center" valign="top" class="es-p40r">
                                                                                                    <a target="_blank" href="https://twitter.com/somablockprints"><img title="Twitter" src="http://143.110.190.232/assets/images/twitter-logo-white.png" alt="Tw" width="32"></a>
                                                                                                </td>
                                                                                                <td align="center" valign="top" class="es-p40r">
                                                                                                    <a target="_blank" href="https://www.instagram.com/somablockprints/"><img title="Instagram" src="http://143.110.190.232/assets/images/instagram-logo-white.png" alt="Instagram" width="32"></a>
                                                                                                </td>
                                                                                                <td align="center" valign="top">
                                                                                                    <a target="_blank" href="https://www.youtube.com/channel/UCbe4E2pO4959tkfHxbe5YTg"><img title="Youtube" src="http://143.110.190.232/assets/images/youtube-logo-white.png" alt="Youtube" width="32"></a>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-text es-p35b">
                                                                                    <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-bottom:0px">Soma&nbsp;© 2021 Soma Block Prints Pvt. Ltd. All Rights Reserved.</p>
                                                                                    <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-top:0px">Soma House, 2-B Girnar Extn.<br>Khatipura, Jaipur 302012,<br>Rajasthan, India</p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-divider="1|solid|#ffffff" esd-tmp-menu-color="#ffffff">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                        <tbody>
                                                                                            <tr class="links">
                                                                                                <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="https://www.somashop.com/" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Visit Us</a></td>
                                                                                                <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/privacy-policy" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Privacy Policy</a></td>
                                                                                                <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/terms-and-conditions" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Terms of Use</a></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center" esd-custom-block-id="388983">
                                    <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure es-p20" align="left">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-text es-infoblock">
                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">
                                                                                        No longer want to receive these emails?&nbsp;<a href target="_blank" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">Unsubscribe</a>.
                                                                                    </p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</body>

</html>`
try {
    settings.findOne()
    .then(async data => {
        settingsdata = (data)
        let mailOptions = {
            from: data.smtp_mail_from_name +'<' + data.smtp_mail_from_address + '>',
            to: to,
            subject: subject,
            html: emailContent
        }
        let response=''
        let transporte = nodemailer.createTransport({
            host: data.smtp_host,
            port: data.smtp_port,
            auth: {
                user: data.smtp_username,
                pass: data.smtp_password,
            },
        })
        transporte.sendMail(mailOptions,function(error,info){
            if(error){
                response=''
            }
            else
            {
                response='mail sent'
            }
            callback(response)
        }) 
    })
} catch (error) {
}
  

        

    }
    adminMail(to,subject,body,callback)
    {
        let emailContent=`
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
        <meta charset="UTF-8">
        <meta content="width=device-width:intial-scale=1.0;maximum-scale=1.0;user-scalable=no;" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <style>
        @media screen (max-width:630px){
            table{width:100%}
            }
            </style>
     </head>
        <body data-new-gr-c-s-loaded="14.1073.0">
    <div class="es-wrapper-color" style="background-color: #efefef;">
        <!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                <v:fill type="tile" color="#efefef"></v:fill>
            </v:background>
        <![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center" esd-custom-block-id="388982">
                                        <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20" align="left" bgcolor="#ffe54a" esd-custom-block-id="717808">
                                                        <table cellpadding="20" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center">
                                                                        <table cellpadding="10" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image es-p10b" style="font-size: 0px;">
                                                                                        <a target="_blank"><img src="https://jwwryi.stripocdn.email/content/guids/CABINET_224138b5cf3b11ddb673c54b04987c31/images/navlog.png" alt="Logo" style="display: block; font-size: 12px;" width="200" title="Logo" class="adapt-img"></a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table><table cellpadding="0" cellspacing="0" class="es-content" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center">
                                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                        <tbody>
                                        ${body}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center" esd-custom-block-id="717807">
                                    <table class="es-footer-body" align="center" cellpadding="20" cellspacing="0" width="600" style="background-color: transparent;">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure es-p20" align="left" bgcolor="#ffffff" style="background-color: #ffffff;">
                                                    <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="143" valign="top"><![endif]-->
                                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td width="133" class="es-m-p0r es-m-p20b esd-container-frame" align="center">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/17971617974647919.png" alt style="display: block;" width="45"></a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">FREE <br>SHIPPING</p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                                <td class="es-hidden" width="10"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td><td width="143" valign="top"><![endif]-->
                                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td width="133" class="es-m-p20b esd-container-frame" align="center">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/80801617974647921.png" alt style="display: block;" width="45"></a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">EASY <br>PAYMENT</p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                                <td class="es-hidden" width="10"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td><td width="132" valign="top"><![endif]-->
                                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td width="132" align="center" class="esd-container-frame es-m-p20b">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/77861617974647919.png" alt style="display: block;" width="45"></a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUICK <br>RETURN</p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td><td width="10"></td><td width="132" valign="top"><![endif]-->
                                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                        <tbody>
                                                            <tr>
                                                                <td width="132" align="center" class="esd-container-frame">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/59831617975283573.png" alt style="display: block;" width="45"></a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUALITY ASSURANCE</p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left" bgcolor="#d12421" style="background-color: #d12421;">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td width="560" class="esd-container-frame" align="left">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                                                                    <table cellpadding="5" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" valign="top" class="es-p40r">
                                                                                                    <a target="_blank" href="https://www.facebook.com/SomaBlockprints/"><img title="Facebook" src="http://143.110.190.232/assets/images/facebook-logo-white.png" alt="Fb" width="32"></a>
                                                                                                </td>
                                                                                                <td align="center" valign="top" class="es-p40r">
                                                                                                    <a target="_blank" href="https://twitter.com/somablockprints"><img title="Twitter" src="http://143.110.190.232/assets/images/twitter-logo-white.png" alt="Tw" width="32"></a>
                                                                                                </td>
                                                                                                <td align="center" valign="top" class="es-p40r">
                                                                                                    <a target="_blank" href="https://www.instagram.com/somablockprints/"><img title="Instagram" src="http://143.110.190.232/assets/images/instagram-logo-white.png" alt="Instagram" width="32"></a>
                                                                                                </td>
                                                                                                <td align="center" valign="top">
                                                                                                    <a target="_blank" href="https://www.youtube.com/channel/UCbe4E2pO4959tkfHxbe5YTg"><img title="Youtube" src="http://143.110.190.232/assets/images/youtube-logo-white.png" alt="Youtube" width="32"></a>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-text es-p35b">
                                                                                    <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-bottom:0px">Soma&nbsp;© 2021 Soma Block Prints Pvt. Ltd. All Rights Reserved.</p>
                                                                                    <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-top:0px">Soma House, 2-B Girnar Extn.<br>Khatipura, Jaipur 302012,<br>Rajasthan, India</p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-divider="1|solid|#ffffff" esd-tmp-menu-color="#ffffff">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                        <tbody>
                                                                                            <tr class="links">
                                                                                                <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="https://www.somashop.com/" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Visit Us</a></td>
                                                                                                <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/privacy-policy" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Privacy Policy</a></td>
                                                                                                <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/terms-and-conditions" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Terms of Use</a></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center" esd-custom-block-id="388983">
                                    <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure es-p20" align="left">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" class="esd-block-text es-infoblock">
                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">
                                                                                        No longer want to receive these emails?&nbsp;<a href target="_blank" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">Unsubscribe</a>.
                                                                                    </p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</body>

</html>`
try {
    settings.findOne()
    .then(async data => {
        settingsdata = (data)
        let mailOptions = {
            from: to,
            to: data.smtp_mail_from_address,
            subject: subject,
            html: emailContent
        }
        let response=''
        let transporte = nodemailer.createTransport({
            host: data.smtp_host,
            port: data.smtp_port,
            auth: {
                user: data.smtp_username,
                pass: data.smtp_password,
            },
        })
        transporte.sendMail(mailOptions,function(error,info){
            if(error){
                response=''
            }
            else
            {
                response='mail sent'
            }
            callback(response)
        }) 
    })
} catch (error) {
}

    }


    generalMail(options,callback)
    {
        let response=''
        transport.sendMail(options, function(error, info){
            if (error) {
              response= ''
            } else {
              response= 'mail sent'
            }
            callback(response);
          })
    }

    async sendOrderSuccess(email, orderData) {
        try{
            let product_body = ''
            await Promise.all(orderData.order_items.map(async (order_item) => {
                let variation_html_body = ''
                order_item?.product_variations_combination?.product_variations_values?.length > 0 &&
                await Promise.all(order_item?.product_variations_combination?.product_variations_values.map(async (variations) => (
                        variation_html_body +=`${variations.attribute?.name || ''}: ${variations.attribute_value.attribute_value}<br/>`
                    ),
                ))
                product_body += `<tr>
                <td class="esd-structure esdev-adapt-off es-p10t es-p10b es-p20r es-p20l" align="left" esd-custom-block-id="388986">
                    <table width="560" cellpadding="0" cellspacing="0" class="esdev-mso-table">
                        <tbody>
                            <tr>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                        <tbody>
                                            <tr>
                                                <td width="70" class="es-m-p0r esd-container-frame" align="center">
                                                    <table cellpadding="0" cellspacing="0" width="100%" style="border-left:2px solid #efefef;border-right:2px solid #efefef;border-top:2px solid #efefef;border-bottom:2px solid #efefef;">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                    <a target="_blank" href="http://143.110.190.232/product?id=${order_item.product.id}"><img class="adapt-img" src="${order_item.product.image}" alt="" style="display: block;" width="66"></a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                        <tbody>
                                            <tr>
                                                <td width="265" class="esd-container-frame" align="center">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>${order_item.product.name}</strong></p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">${variation_html_body}</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                        <tbody>
                                            <tr>
                                                <td width="80" align="left" class="esd-container-frame">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">${order_item.qty} qty</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                        <tbody>
                                            <tr>
                                                <td width="85" align="left" class="esd-container-frame">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">${orderData.currency_symbol}${order_item.qty*order_item.price}</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>`
        }))
    product_body+=`<tr>
    <td class="esd-structure es-p10t es-p20r es-p20l" align="left">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td width="560" class="es-m-p0r esd-container-frame" align="center">
                        <table cellpadding="0" cellspacing="0" width="100%" style="border-top: 2px solid #efefef; border-bottom: 2px solid #efefef;">
                            <tbody>
                                <tr>
                                    <td align="right" class="esd-block-text es-m-txt-r es-p10t es-p20b es-p40r">
                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Subtotal:&nbsp;&nbsp;<strong>${orderData.currency_symbol} ${orderData.sub_total}</strong></p>
                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Shipping:&nbsp;&nbsp;<strong>${orderData.currency_symbol} ${orderData.shipping_charge}</strong><br>Discount:&nbsp; <strong>${orderData.currency_symbol} ${orderData.discount_total}</strong></strong><br>---------------------<br>Total:&nbsp;&nbsp;<strong>${orderData.currency_symbol} ${orderData.total}</strong><br></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
</tr>`
product_body+=`<tr>
<td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left">
    <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="280" valign="top"><![endif]-->
    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
        <tbody>
            <tr>
                <td width="280" class="es-m-p0r esd-container-frame es-m-p20b" align="center">
                    <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                            <tr>
                                <td align="left" class="esd-block-text">
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Customer:</strong> ${orderData.shipping_first_name} ${orderData.shipping_last_name}</p>
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Order ID:</strong>&nbsp;#${orderData.order_number}</p>
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Invoice Date:</strong>&nbsp;${orderData.order_date}</p>
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Payment Method:</strong>&nbsp;${orderData.payment_type}</p>
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Currency:</strong>&nbsp;${orderData.currency_symbol}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <!--[if mso]></td><td width="0"></td><td width="280" valign="top"><![endif]-->
    <table cellpadding="0" cellspacing="0" class="es-right" align="right">
        <tbody>
            <tr>
                <td width="280" class="es-m-p0r esd-container-frame" align="center">
                    <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                            <tr>
                                <td align="right" class="esd-block-text es-m-txt-l es-p35r">
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Shipping Method:</strong> ${orderData.shipping_method.name}</p>
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Shipping Address: </strong>${orderData.shipping_street_address}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <!--[if mso]></td></tr></table><![endif]-->
</td>
</tr><tr>
<td class="esd-structure es-p15t es-p10b es-p20r es-p20l" align="left">
    <table cellpadding="0" cellspacing="0" width="100%">
        <tbody>
            <tr>
                <td width="560" align="left" class="esd-container-frame">
                    <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                            <tr>
                                <td align="center" class="esd-block-spacer es-p20" style="font-size:0">
                                    <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr>
                                                <td style="border-bottom: 2px solid #cccccc; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" class="esd-block-text es-p10t es-p10b" esd-links-color="#5a6edf">
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Got a question?&nbsp;Email us at&nbsp;<a target="_blank" href="mailto:info@somashop.com" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">info@somashop.com</a>&nbsp;or give us a call at&nbsp;
                                        <a target="_blank" href="tel:+919116653338" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">+91 9116653338</a>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</td>
</tr>
`
try {
    settings.findOne()
    .then(async data => {
        settingsdata = (data)
        let response=''
        let transporte = nodemailer.createTransport({
            host: data.smtp_host,
            port: data.smtp_port,
            auth: {
                user: data.smtp_username,
                pass: data.smtp_password,
            },
        })
        transporte.sendMail({
    from: data.smtp_mail_from_name+'<'+data.smtp_mail_from_address+'>',
    to: email,
    subject: "Your Order is payment is successfully done",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
            <meta charset="UTF-8">
            <meta content="width=device-width:intial-scale=1.0;maximum-scale=1.0;user-scalable=no;" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <style>
            @media screen (max-width:630px){
                table{width:100%}
                }
                </style>
         </head>
            <body data-new-gr-c-s-loaded="14.1073.0">
        <div class="es-wrapper-color" style="background-color: #efefef;">
            <!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#efefef"></v:fill>
                </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td class="esd-email-paddings" valign="top">
                            <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" align="center" esd-custom-block-id="388982">
                                            <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure es-p20" align="left" bgcolor="#ffe54a" esd-custom-block-id="717808">
                                                            <table cellpadding="20" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center">
                                                                            <table cellpadding="10" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-image es-p10b" style="font-size: 0px;">
                                                                                            <a target="_blank"><img src="https://jwwryi.stripocdn.email/content/guids/CABINET_224138b5cf3b11ddb673c54b04987c31/images/navlog.png" alt="Logo" style="display: block; font-size: 12px;" width="200" title="Logo" class="adapt-img"></a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table><table cellpadding="0" cellspacing="0" class="es-content" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                            <tbody>
                                            <tr>
                                                    <td class="esd-structure es-p15t es-p20r es-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image es-p10t es-p10b" style="font-size: 0px;">
                                                                                        <a target="_blank"><img src="http://143.110.190.232/assets/images/151618429860259.png" alt="" style="display: block; margin-top:40px” width="100"></a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p10b es-m-txt-c">
                                                                                        <h1 style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style: normal;font-weight: bold; color: #333333;margin:0px">Thanks for&nbsp;choosing us!</h1>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
<tr>
                                                    <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l">
                                                                                        <p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style: normal;font-weight: bold; color: #333333;margin:0px">Your order&nbsp;has now been completed!&nbsp;<br />We've attached your <strong>receipt </strong>to this email.</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-button es-p10t es-p10b"><span class="es-button-border" style="background: #e06666;"><a href="http://143.110.190.232/profile" class="es-button" target="_blank" style="border-left-width: 30px; border-right-width: 30px; border-radius: 6px;border-style: solid; border-color: #cc0000;   border-width: 10px 30px 10px 30px; display: inline-block;background: #cc0000;border-radius: 5px;font-size: 20px;font-family: 'times new roman', times, baskerville, georgia, serif; font-weight: normal;font-style: normal; line-height: 120%;color: #ffffff;text-decoration: none;width: auto;text-align: center;margin-top: 25px;margin-bottom:25px">MY ACCOUNT</a></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
<tr>
                                                    <td class="esd-structure" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="600" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-spacer es-p20t es-p20r es-p20l" style="font-size: 0px;">
                                                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style="border-bottom: 2px solid #efefef; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            ${product_body}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center" esd-custom-block-id="717807">
                                        <table class="es-footer-body" align="center" cellpadding="20" cellspacing="0" width="600" style="background-color: transparent;">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20" align="left" bgcolor="#ffffff" style="background-color: #ffffff;">
                                                        <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="143" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="133" class="es-m-p0r es-m-p20b esd-container-frame" align="center">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                        <a target="_blank"><img src="http://143.110.190.232/assets/images/17971617974647919.png" alt style="display: block;" width="45"></a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">FREE <br>SHIPPING</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td class="es-hidden" width="10"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="143" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="133" class="es-m-p20b esd-container-frame" align="center">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                        <a target="_blank"><img src="http://143.110.190.232/assets/images/80801617974647921.png" alt style="display: block;" width="45"></a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">EASY <br>PAYMENT</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td class="es-hidden" width="10"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="132" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="132" align="center" class="esd-container-frame es-m-p20b">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                        <a target="_blank"><img src="http://143.110.190.232/assets/images/77861617974647919.png" alt style="display: block;" width="45"></a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUICK <br>RETURN</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="10"></td><td width="132" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="132" align="center" class="esd-container-frame">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                        <a target="_blank"><img src="http://143.110.190.232/assets/images/59831617975283573.png" alt style="display: block;" width="45"></a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUALITY ASSURANCE</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left" bgcolor="#d12421" style="background-color: #d12421;">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="left">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                                                                        <table cellpadding="5" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" valign="top" class="es-p40r">
                                                                                                        <a target="_blank" href="https://www.facebook.com/SomaBlockprints/"><img title="Facebook" src="http://143.110.190.232/assets/images/facebook-logo-white.png" alt="Fb" width="32"></a>
                                                                                                    </td>
                                                                                                    <td align="center" valign="top" class="es-p40r">
                                                                                                        <a target="_blank" href="https://twitter.com/somablockprints"><img title="Twitter" src="http://143.110.190.232/assets/images/twitter-logo-white.png" alt="Tw" width="32"></a>
                                                                                                    </td>
                                                                                                    <td align="center" valign="top" class="es-p40r">
                                                                                                        <a target="_blank" href="https://www.instagram.com/somablockprints/"><img title="Instagram" src="http://143.110.190.232/assets/images/instagram-logo-white.png" alt="Instagram" width="32"></a>
                                                                                                    </td>
                                                                                                    <td align="center" valign="top">
                                                                                                        <a target="_blank" href="https://www.youtube.com/channel/UCbe4E2pO4959tkfHxbe5YTg"><img title="Youtube" src="http://143.110.190.232/assets/images/youtube-logo-white.png" alt="Youtube" width="32"></a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p35b">
                                                                                        <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-bottom:0px">Soma&nbsp;© 2021 Soma Block Prints Pvt. Ltd. All Rights Reserved.</p>
                                                                                        <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-top:0px">Soma House, 2-B Girnar Extn.<br>Khatipura, Jaipur 302012,<br>Rajasthan, India</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-divider="1|solid|#ffffff" esd-tmp-menu-color="#ffffff">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                            <tbody>
                                                                                                <tr class="links">
                                                                                                    <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="https://www.somashop.com/" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Visit Us</a></td>
                                                                                                    <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/privacy-policy" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Privacy Policy</a></td>
                                                                                                    <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/terms-and-conditions" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Terms of Use</a></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center" esd-custom-block-id="388983">
                                        <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-infoblock">
                                                                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">
                                                                                            No longer want to receive these emails?&nbsp;<a href target="_blank" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">Unsubscribe</a>.
                                                                                        </p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </body>
    
    </html>`
})
    })
} catch (error) {
}

console.log('mail sent successfully')
} catch (error) {
console.log(error)
return error
}   
    }

    async sendOrderFail(email, orderData) {
        try{
            let product_body = ''
            await Promise.all(orderData.order_items.map(async (order_item) => {
                let variation_html_body = ''
                order_item?.product_variations_combination?.product_variations_values?.length > 0 &&
                await Promise.all(order_item?.product_variations_combination?.product_variations_values.map(async (variations) => (
                        variation_html_body +=`${variations.attribute?.name || ''}: ${variations.attribute_value.attribute_value}<br/>`
                    ),
                ))
                product_body += `<tr>
                <td class="esd-structure esdev-adapt-off es-p10t es-p10b es-p20r es-p20l" align="left" esd-custom-block-id="388986">
                    <table width="560" cellpadding="10" cellspacing="0" class="esdev-mso-table">
                        <tbody>
                            <tr>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="padding-left::30px">
                                        <tbody>
                                            <tr>
                                                <td width="70" class="es-m-p0r esd-container-frame" align="center">
                                                    <table cellpadding="0" cellspacing="0" width="100%" style="border-left:2px solid #efefef;border-right:2px solid #efefef;border-top:2px solid #efefef;border-bottom:2px solid #efefef;">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                    <a target="_blank" href="http://143.110.190.232/product?id=${order_item.product.id}"><img class="adapt-img" src="${order_item.product.image}" alt="" style="display: block;" width="66"></a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                        <tbody>
                                            <tr>
                                                <td width="265" class="esd-container-frame" align="center">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>${order_item.product.name}</strong><br />${variation_html_body}</p>
                                                                </td>
                                                            </tr>
                                                        
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                        <tbody>
                                            <tr>
                                                <td width="80" align="left" class="esd-container-frame">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">${order_item.qty} qty</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                        <tbody>
                                            <tr>
                                                <td width="85" align="left" class="esd-container-frame">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="right" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">${orderData.currency_symbol}${order_item.qty*order_item.price}</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>`
        }))
    product_body+=`<tr>
    <td class="esd-structure es-p10t es-p20r es-p20l" align="left">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td width="560" class="es-m-p0r esd-container-frame" align="center">
                        <table cellpadding="0" cellspacing="0" width="100%" style="border-top: 2px solid #efefef; border-bottom: 2px solid #efefef;padding-right:30px">
                            <tbody>
                                <tr>
                                    <td align="right" class="esd-block-text es-m-txt-r es-p10t es-p20b es-p40r">
                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Subtotal:&nbsp;&nbsp;<strong>${orderData.currency_symbol} ${orderData.sub_total}</strong></p>
                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Shipping:&nbsp;&nbsp;<strong>${orderData.currency_symbol} ${orderData.shipping_charge}</strong><br>Discount:&nbsp; <strong>${orderData.currency_symbol} ${orderData.discount_total}</strong></strong><br>---------------------<br>Total:&nbsp;&nbsp;<strong>${orderData.currency_symbol} ${orderData.total}</strong><br></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
    </tr>`
    product_body+=`<tr>
    <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left">
    <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="280" valign="top"><![endif]-->
    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
        <tbody>
            <tr>
                <td width="280" class="es-m-p0r esd-container-frame es-m-p20b" align="center">
                    <table cellpadding="0" cellspacing="0" width="100%" style="padding-left:30px">
                        <tbody>
                            <tr>
                                <td align="left" class="esd-block-text">
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Customer:</strong> ${orderData.shipping_first_name} ${orderData.shipping_last_name}</p>
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Order ID:</strong>&nbsp;#${orderData.order_number}</p>
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Invoice Date:</strong>&nbsp;${orderData.order_date}</p>
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Payment Method:</strong>&nbsp;${orderData.payment_type}</p>
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Currency:</strong>&nbsp;${orderData.currency_symbol}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <!--[if mso]></td><td width="0"></td><td width="280" valign="top"><![endif]-->
    <table cellpadding="0" cellspacing="0" class="es-right" align="right">
        <tbody>
            <tr>
                <td width="280" class="es-m-p0r esd-container-frame" align="center">
                    <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                            <tr>
                                <td align="right" class="esd-block-text es-m-txt-l es-p35r">
                                    
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333;padding-right:30px"><strong>Shipping Address: </strong>${orderData.shipping_street_address}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <!--[if mso]></td></tr></table><![endif]-->
    </td>
    </tr><tr>
    <td class="esd-structure es-p15t es-p10b es-p20r es-p20l" align="left">
    <table cellpadding="0" cellspacing="0" width="100%">
        <tbody>
            <tr>
                <td width="560" align="left" class="esd-container-frame">
                    <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                            <tr>
                                <td align="center" class="esd-block-spacer es-p20" style="font-size:0">
                                    <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr>
                                                <td style="border-bottom: 2px solid #cccccc; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" class="esd-block-text es-p10t es-p10b" esd-links-color="#5a6edf">
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Got a question?&nbsp;Email us at&nbsp;<a target="_blank" href="mailto:info@somashop.com" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">info@somashop.com</a>&nbsp;or give us a call at&nbsp;
                                        <a target="_blank" href="tel:+919116653338" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">+91 9116653338</a>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    </td>
    </tr>
    `
    try {
        settings.findOne()
        .then(async data => {
            settingsdata = (data)
            let response=''
            let transporte = nodemailer.createTransport({
                host: data.smtp_host,
                port: data.smtp_port,
                auth: {
                    user: data.smtp_username,
                    pass: data.smtp_password,
                },
            })
            transporte.sendMail({
    from: data.smtp_mail_from_name+'<'+data.smtp_mail_from_address+'>',
    to: email,
    subject: "Failed to place your order",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
            <meta charset="UTF-8">
            <meta content="width=device-width:intial-scale=1.0;maximum-scale=1.0;user-scalable=no;" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <style>
            @media screen (max-width:630px){
                table{width:100%}
                }
                </style>
        </head>
            <body data-new-gr-c-s-loaded="14.1073.0">
        <div class="es-wrapper-color" style="background-color: #efefef;">
            <!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#efefef"></v:fill>
                </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td class="esd-email-paddings" valign="top">
                            <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" align="center" esd-custom-block-id="388982">
                                            <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure es-p20" align="left" bgcolor="#ffe54a" esd-custom-block-id="717808">
                                                            <table cellpadding="20" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center">
                                                                            <table cellpadding="10" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-image es-p10b" style="font-size: 0px;">
                                                                                            <a target="_blank"><img src="https://jwwryi.stripocdn.email/content/guids/CABINET_224138b5cf3b11ddb673c54b04987c31/images/navlog.png" alt="Logo" style="display: block; font-size: 12px;" width="200" title="Logo" class="adapt-img"></a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table><table cellpadding="0" cellspacing="0" class="es-content" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                            <tbody>
                                            <tr>
                                                    <td class="esd-structure es-p15t es-p20r es-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image es-p10t es-p10b" style="font-size: 0px;">
                                                                                        <a target="_blank"><img src="http://143.110.190.232/assets/images/1401618430238266.png" alt="" style="display: block; margin-top:40px;width:100px” width="100"></a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p10b es-m-txt-c">
                                                                                        <h1 style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style: normal;font-weight: bold; color: #333333;margin:0px">Payment Failed</h1>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
    <tr>
                                                    <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l">
                                                                                        <p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style: normal;font-weight: bold; color: #333333;margin:0px">We were unable to process your payment.<br />Got a question?&nbsp;Email us at&nbsp;<a target="_blank" href="mailto:info@somashop.com" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">info@somashop.com</a>&nbsp;or give us a call at&nbsp;
                                                                                        <a target="_blank" href="tel:+919116653338" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">+91 9116653338</a></p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-button es-p10t es-p10b"><span class="es-button-border" style="background: #e06666;"><a href="http://143.110.190.232/profile" class="es-button" target="_blank" style="border-left-width: 30px; border-right-width: 30px; border-radius: 6px;border-style: solid; border-color: #cc0000;   border-width: 10px 30px 10px 30px; display: inline-block;background: #cc0000;border-radius: 5px;font-size: 20px;font-family: 'times new roman', times, baskerville, georgia, serif; font-weight: normal;font-style: normal; line-height: 120%;color: #ffffff;text-decoration: none;width: auto;text-align: center;margin-top: 25px;margin-bottom:25px">MY ACCOUNT</a></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
    <tr>
                                                    <td class="esd-structure" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="600" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-spacer es-p20t es-p20r es-p20l" style="font-size: 0px;">
                                                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style="border-bottom: 2px solid #efefef; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            ${product_body}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center" esd-custom-block-id="717807">
                                        <table class="es-footer-body" align="center" cellpadding="20" cellspacing="0" width="600" style="background-color: transparent;">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20" align="left" bgcolor="#ffffff" style="background-color: #ffffff;">
                                                        <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="143" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="133" class="es-m-p0r es-m-p20b esd-container-frame" align="center">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                        <a target="_blank"><img src="http://143.110.190.232/assets/images/17971617974647919.png" alt style="display: block;" width="45"></a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">FREE <br>SHIPPING</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td class="es-hidden" width="10"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="143" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="133" class="es-m-p20b esd-container-frame" align="center">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                        <a target="_blank"><img src="http://143.110.190.232/assets/images/80801617974647921.png" alt style="display: block;" width="45"></a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">EASY <br>PAYMENT</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td class="es-hidden" width="10"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="132" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="132" align="center" class="esd-container-frame es-m-p20b">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                        <a target="_blank"><img src="http://143.110.190.232/assets/images/77861617974647919.png" alt style="display: block;" width="45"></a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUICK <br>RETURN</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="10"></td><td width="132" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="132" align="center" class="esd-container-frame">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                        <a target="_blank"><img src="http://143.110.190.232/assets/images/59831617975283573.png" alt style="display: block;" width="45"></a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUALITY ASSURANCE</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left" bgcolor="#d12421" style="background-color: #d12421;">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="left">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                                                                        <table cellpadding="5" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" valign="top" class="es-p40r">
                                                                                                        <a target="_blank" href="https://www.facebook.com/SomaBlockprints/"><img title="Facebook" src="http://143.110.190.232/assets/images/facebook-logo-white.png" alt="Fb" width="32"></a>
                                                                                                    </td>
                                                                                                    <td align="center" valign="top" class="es-p40r">
                                                                                                        <a target="_blank" href="https://twitter.com/somablockprints"><img title="Twitter" src="http://143.110.190.232/assets/images/twitter-logo-white.png" alt="Tw" width="32"></a>
                                                                                                    </td>
                                                                                                    <td align="center" valign="top" class="es-p40r">
                                                                                                        <a target="_blank" href="https://www.instagram.com/somablockprints/"><img title="Instagram" src="http://143.110.190.232/assets/images/instagram-logo-white.png" alt="Instagram" width="32"></a>
                                                                                                    </td>
                                                                                                    <td align="center" valign="top">
                                                                                                        <a target="_blank" href="https://www.youtube.com/channel/UCbe4E2pO4959tkfHxbe5YTg"><img title="Youtube" src="http://143.110.190.232/assets/images/youtube-logo-white.png" alt="Youtube" width="32"></a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p35b">
                                                                                        <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-bottom:0px">Soma&nbsp;© 2021 Soma Block Prints Pvt. Ltd. All Rights Reserved.</p>
                                                                                        <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-top:0px">Soma House, 2-B Girnar Extn.<br>Khatipura, Jaipur 302012,<br>Rajasthan, India</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-divider="1|solid|#ffffff" esd-tmp-menu-color="#ffffff">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                            <tbody>
                                                                                                <tr class="links">
                                                                                                    <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="https://www.somashop.com/" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Visit Us</a></td>
                                                                                                    <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/privacy-policy" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Privacy Policy</a></td>
                                                                                                    <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/terms-and-conditions" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Terms of Use</a></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center" esd-custom-block-id="388983">
                                        <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-infoblock">
                                                                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">
                                                                                            No longer want to receive these emails?&nbsp;<a href target="_blank" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">Unsubscribe</a>.
                                                                                        </p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </body>

    </html>`
    })

        })
    } catch (error) {
    }

    console.log('mail sent successfully')
    } catch (error) {
    console.log(error)
    return error
    }   
    }

    async sendOrderConfirm(email, orderData) {
        try{
            let product_body = ''
            await Promise.all(orderData.order_items.map(async (order_item) => {
                let variation_html_body = ''
                order_item?.product_variations_combination?.product_variations_values?.length > 0 &&
                await Promise.all(order_item?.product_variations_combination?.product_variations_values.map(async (variations) => (
                        variation_html_body +=`${variations.attribute?.name || ''}: ${variations.attribute_value.attribute_value}<br/>`
                    ),
                ))
                product_body += `<tr>
                <td class="esd-structure esdev-adapt-off es-p10t es-p10b es-p20r es-p20l" align="left" esd-custom-block-id="388986">
                    <table width="560" cellpadding="10" cellspacing="0" class="esdev-mso-table">
                        <tbody>
                            <tr>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="padding-left::30px">
                                        <tbody>
                                            <tr>
                                                <td width="70" class="es-m-p0r esd-container-frame" align="center">
                                                    <table cellpadding="0" cellspacing="0" width="100%" style="border-left:2px solid #efefef;border-right:2px solid #efefef;border-top:2px solid #efefef;border-bottom:2px solid #efefef;">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                    <a target="_blank" href="http://143.110.190.232/product?id=${order_item.product.id}"><img class="adapt-img" src="${order_item.product.image}" alt="" style="display: block;" width="66"></a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                        <tbody>
                                            <tr>
                                                <td width="265" class="esd-container-frame" align="center">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>${order_item.product.name}</strong><br />${variation_html_body}</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                        <tbody>
                                            <tr>
                                                <td width="80" align="left" class="esd-container-frame">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">${order_item.qty} qty</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                        <tbody>
                                            <tr>
                                                <td width="85" align="left" class="esd-container-frame">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="right" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">${orderData.currency_symbol}${order_item.qty*order_item.price}</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                </tr>`
            }))
            product_body+=`<tr>
            <td class="esd-structure es-p10t es-p20r es-p20l" align="left">
                <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                        <tr>
                            <td width="560" class="es-m-p0r esd-container-frame" align="center">
                                <table cellpadding="0" cellspacing="0" width="100%" style="border-top: 2px solid #efefef; border-bottom: 2px solid #efefef;padding-right:30px">
                                    <tbody>
                                        <tr>
                                            <td align="right" class="esd-block-text es-m-txt-r es-p10t es-p20b es-p40r">
                                                <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Subtotal:&nbsp;&nbsp;<strong>${orderData.currency_symbol} ${orderData.sub_total}</strong></p>
                                                <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Shipping:&nbsp;&nbsp;<strong>${orderData.currency_symbol} ${orderData.shipping_charge}</strong><br>Discount:&nbsp; <strong>${orderData.currency_symbol} ${orderData.discount_total}</strong></strong><br>---------------------<br>Total:&nbsp;&nbsp;<strong>${orderData.currency_symbol} ${orderData.total}</strong><br></p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
            </tr>`
            product_body+=`<tr>
            <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left">
            <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="280" valign="top"><![endif]-->
            <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                <tbody>
                    <tr>
                        <td width="280" class="es-m-p0r esd-container-frame es-m-p20b" align="center">
                            <table cellpadding="0" cellspacing="0" width="100%" style="padding-left:30px">
                                <tbody>
                                    <tr>
                                        <td align="left" class="esd-block-text">
                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Customer:</strong> ${orderData.shipping_first_name} ${orderData.shipping_last_name}</p>
                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Order ID:</strong>&nbsp;#${orderData.order_number}</p>
                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Invoice Date:</strong>&nbsp;${orderData.order_date}</p>
                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Payment Method:</strong>&nbsp;${orderData.payment_type}</p>
                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Currency:</strong>&nbsp;${orderData.currency_symbol}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--[if mso]></td><td width="0"></td><td width="280" valign="top"><![endif]-->
            <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                <tbody>
                    <tr>
                        <td width="280" class="es-m-p0r esd-container-frame" align="center">
                            <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td align="right" class="esd-block-text es-m-txt-l es-p35r">
                                            
                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333;padding-right:30px"><strong>Shipping Address: </strong>${orderData.shipping_street_address}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--[if mso]></td></tr></table><![endif]-->
            </td>
            </tr><tr>
            <td class="esd-structure es-p15t es-p10b es-p20r es-p20l" align="left">
            <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                    <tr>
                        <td width="560" align="left" class="esd-container-frame">
                            <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td align="center" class="esd-block-spacer es-p20" style="font-size:0">
                                            <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="border-bottom: 2px solid #cccccc; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" class="esd-block-text es-p10t es-p10b" esd-links-color="#5a6edf">
                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Got a question?&nbsp;Email us at&nbsp;<a target="_blank" href="mailto:info@somashop.com" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">info@somashop.com</a>&nbsp;or give us a call at&nbsp;
                                                <a target="_blank" href="tel:+919116653338" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">+91 9116653338</a>
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            </td>
            </tr>
            `
            try {
                settings.findOne()
                .then(async data => {
                    settingsdata = (data)
                    let response=''
                    let transporte = nodemailer.createTransport({
                        host: data.smtp_host,
                        port: data.smtp_port,
                        auth: {
                            user: data.smtp_username,
                            pass: data.smtp_password,
                        },
                    })

                    transporte.sendMail({
                        from: data.smtp_mail_from_name+'<'+data.smtp_mail_from_address+'>',
                        to: email,
                        subject: "Your order is confirmed",
                        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                        <head>
                                <meta charset="UTF-8">
                                <meta content="width=device-width:intial-scale=1.0;maximum-scale=1.0;user-scalable=no;" name="viewport">
                                <meta name="x-apple-disable-message-reformatting">
                                <style>
                                @media screen (max-width:630px){
                                    table{width:100%}
                                    }
                                    </style>
                            </head>
                                <body data-new-gr-c-s-loaded="14.1073.0">
                            <div class="es-wrapper-color" style="background-color: #efefef;">
                                <!--[if gte mso 9]>
                                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                        <v:fill type="tile" color="#efefef"></v:fill>
                                    </v:background>
                                <![endif]-->
                                <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td class="esd-email-paddings" valign="top">
                                                <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-stripe" align="center" esd-custom-block-id="388982">
                                                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-structure es-p20" align="left" bgcolor="#ffe54a" esd-custom-block-id="717808">
                                                                                <table cellpadding="20" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center">
                                                                                                <table cellpadding="10" cellspacing="0" width="100%">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td align="center" class="esd-block-image es-p10b" style="font-size: 0px;">
                                                                                                                <a target="_blank"><img src="https://jwwryi.stripocdn.email/content/guids/CABINET_224138b5cf3b11ddb673c54b04987c31/images/navlog.png" alt="Logo" style="display: block; font-size: 12px;" width="200" title="Logo" class="adapt-img"></a>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table><table cellpadding="0" cellspacing="0" class="es-content" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-stripe" align="center">
                                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                                <tbody>
                                                                <tr>
                                                                        <td class="esd-structure es-p15t es-p20r es-p20l" align="left">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:30px">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-image es-p10t es-p10b" style="font-size: 0px;margin-top:30px;">
                                                                                                            <img src="http://143.110.190.232/assets/images/84141618400759579.png" width="100">
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p10b es-m-txt-c">
                                                                                                            <h1 style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style: normal;font-weight: bold; color: #333333;margin:0px">Order confirmation</h1>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                            <td align="center" class="esd-block-text es-m-txt-c">
                                                                                                                <h2 style="font-size: 26px;font-style: normal;font-weight: bold;color: #333333;">Order&nbsp;<a href="http://143.110.190.232/profile" target="_blank">#${orderData.order_number}</a></h2>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l">
                                                                                                                <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333;margin:0px">${orderData.order_date}</p>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l">
                                                                                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333;margin:0px">This email is to confirm your order. We will send you another email<br />as soon as it ships.</p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-button es-p10t es-p10b"><span class="es-button-border" style="background: #e06666;"><a href="http://143.110.190.232/profile" class="es-button" target="_blank" style="border-left-width: 30px; border-right-width: 30px; border-radius: 6px;border-style: solid; border-color: #cc0000;   border-width: 10px 30px 10px 30px; display: inline-block;background: #cc0000;border-radius: 5px;font-size: 20px;font-family: 'times new roman', times, baskerville, georgia, serif; font-weight: normal;font-style: normal; line-height: 120%;color: #ffffff;text-decoration: none;width: auto;text-align: center;margin-top: 25px;margin-bottom:25px">MY ACCOUNT</a></span></td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                    <td class="esd-structure" align="left">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="600" class="esd-container-frame" align="center" valign="top">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-spacer es-p5t es-p20b es-p20r es-p20l" style="font-size: 0px;">
                                                                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td style="border-bottom: 2px solid #efefef; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr><tr>
                                                                <td class="esd-structure" align="left">
                                                                    <!--[if mso]><table width="600" cellpadding="0" cellspacing="0"><tr><td width="290" valign="top"><![endif]-->
                                                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="290" class="es-m-p20b esd-container-frame" align="left">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%" style='margin-top: 10px;margin-bottom:10px'>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-button"><span class="es-button-border" style="border-radius: 6px; border-color: #cc0000; background: #cc0000; border-width: 2px;"><a href="${env.BASEURL}'/'${env.invoice_path}'/'${orderData.order_number}.pdf" class="es-button es-button-1660378113915" target="_blank" style="border-radius: 6px; font-family: &quot;times new roman&quot;, times, baskerville, georgia, serif; background: #cc0000; border-color: #cc0000; border-width: 0px 30px; font-size: 18px;padding:3px 21px; color:#ffffff;text-decoration:none">
                                                                                                            <!--[if !mso]><!-- --><img src="http://143.110.190.232/assets/images/pdf_icz.png" alt="icon" width="16" class="esd-icon-left" style="margin-right:10px;" align="absmiddle">
                                                                                                            <!--<![endif]-->Invoice
                                                                                                        </a></span>
                                                                                                    <esd-config-block value="{&quot;configClass&quot;:&quot;es-button-1660378113915&quot;,&quot;rule&quot;:&quot;[data-ogsb] .es-button.es-button-1660378113915&quot;,&quot;properties&quot;:{&quot;padding&quot;:&quot;0px 30px !important&quot;}}" name="btnIndentSettingsControl" style="display: none;"></esd-config-block>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if mso]></td><td width="20"></td><td width="290" valign="top"><![endif]-->
                                                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="290" align="left" class="esd-container-frame">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%"  style='margin-top: 10px;margin-bottom:10px'>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-button"><span class="es-button-border" style="border-radius: 6px; border-color: #cc0000; background: #cc0000; border-width: 2px;"><a href="http://143.110.190.232/track-order?id=${orderData.id}" class="es-button es-button-1660378540032" target="_blank" style="border-radius: 6px; font-family: &quot;times new roman&quot;, times, baskerville, georgia, serif; background: #cc0000; border-color: #cc0000; border-width: 0px 15px; font-size: 18px;padding:3px 21px; color:#ffffff;text-decoration:none">
                                                                                                            <!--[if !mso]><!-- --><img src="http://143.110.190.232/assets/images/Track.png" alt="icon" width="16" class="esd-icon-left" style="margin-right:10px;" align="absmiddle">
                                                                                                            <!--<![endif]-->Track Order
                                                                                                        </a></span>
                                                                                                    <esd-config-block value="{&quot;configClass&quot;:&quot;es-button-1660378540032&quot;,&quot;rule&quot;:&quot;[data-ogsb] .es-button.es-button-1660378540032&quot;,&quot;properties&quot;:{&quot;padding&quot;:&quot;0px 15px !important&quot;}}" name="btnIndentSettingsControl" style="display: none;"></esd-config-block>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                                </td>
                                                            </tr><tr>
                                                            <td class="esd-structure" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="600" class="esd-container-frame" align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-spacer es-p20t es-p20r es-p20l" style="font-size: 0px;">
                                                                                                <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td style="border-bottom: 2px solid #efefef; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                                ${product_body}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-stripe" align="center" esd-custom-block-id="717807">
                                                            <table class="es-footer-body" align="center" cellpadding="20" cellspacing="0" width="600" style="background-color: transparent;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="esd-structure es-p20" align="left" bgcolor="#ffffff" style="background-color: #ffffff;">
                                                                            <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="143" valign="top"><![endif]-->
                                                                            <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="133" class="es-m-p0r es-m-p20b esd-container-frame" align="center">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                            <a target="_blank"><img src="http://143.110.190.232/assets/images/17971617974647919.png" alt style="display: block;" width="45"></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">FREE <br>SHIPPING</p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                        <td class="es-hidden" width="10"></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <!--[if mso]></td><td width="143" valign="top"><![endif]-->
                                                                            <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="133" class="es-m-p20b esd-container-frame" align="center">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                            <a target="_blank"><img src="http://143.110.190.232/assets/images/80801617974647921.png" alt style="display: block;" width="45"></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">EASY <br>PAYMENT</p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                        <td class="es-hidden" width="10"></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <!--[if mso]></td><td width="132" valign="top"><![endif]-->
                                                                            <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="132" align="center" class="esd-container-frame es-m-p20b">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                            <a target="_blank"><img src="http://143.110.190.232/assets/images/77861617974647919.png" alt style="display: block;" width="45"></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUICK <br>RETURN</p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <!--[if mso]></td><td width="10"></td><td width="132" valign="top"><![endif]-->
                                                                            <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="132" align="center" class="esd-container-frame">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                            <a target="_blank"><img src="http://143.110.190.232/assets/images/59831617975283573.png" alt style="display: block;" width="45"></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUALITY ASSURANCE</p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <!--[if mso]></td></tr></table><![endif]-->
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left" bgcolor="#d12421" style="background-color: #d12421;">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="560" class="esd-container-frame" align="left">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                                                                                            <table cellpadding="5" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td align="center" valign="top" class="es-p40r">
                                                                                                                            <a target="_blank" href="https://www.facebook.com/SomaBlockprints/"><img title="Facebook" src="http://143.110.190.232/assets/images/facebook-logo-white.png" alt="Fb" width="32"></a>
                                                                                                                        </td>
                                                                                                                        <td align="center" valign="top" class="es-p40r">
                                                                                                                            <a target="_blank" href="https://twitter.com/somablockprints"><img title="Twitter" src="http://143.110.190.232/assets/images/twitter-logo-white.png" alt="Tw" width="32"></a>
                                                                                                                        </td>
                                                                                                                        <td align="center" valign="top" class="es-p40r">
                                                                                                                            <a target="_blank" href="https://www.instagram.com/somablockprints/"><img title="Instagram" src="http://143.110.190.232/assets/images/instagram-logo-white.png" alt="Instagram" width="32"></a>
                                                                                                                        </td>
                                                                                                                        <td align="center" valign="top">
                                                                                                                            <a target="_blank" href="https://www.youtube.com/channel/UCbe4E2pO4959tkfHxbe5YTg"><img title="Youtube" src="http://143.110.190.232/assets/images/youtube-logo-white.png" alt="Youtube" width="32"></a>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p35b">
                                                                                                            <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-bottom:0px">Soma&nbsp;© 2021 Soma Block Prints Pvt. Ltd. All Rights Reserved.</p>
                                                                                                            <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-top:0px">Soma House, 2-B Girnar Extn.<br>Khatipura, Jaipur 302012,<br>Rajasthan, India</p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-divider="1|solid|#ffffff" esd-tmp-menu-color="#ffffff">
                                                                                                            <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                                                <tbody>
                                                                                                                    <tr class="links">
                                                                                                                        <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="https://www.somashop.com/" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Visit Us</a></td>
                                                                                                                        <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/privacy-policy" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Privacy Policy</a></td>
                                                                                                                        <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/terms-and-conditions" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Terms of Use</a></td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-stripe" align="center" esd-custom-block-id="388983">
                                                            <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="esd-structure es-p20" align="left">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-infoblock">
                                                                                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">
                                                                                                                No longer want to receive these emails?&nbsp;<a href target="_blank" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">Unsubscribe</a>.
                                                                                                            </p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </body>

                        </html>`
                    })
                })
            } catch (error) {
            }
            console.log('mail sent successfully')
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async sendOrderShipped(email, orderData) {
        try{
            let product_body = ''
            await Promise.all(orderData.order_items.map(async (order_item) => {
                let variation_html_body = ''
                order_item?.product_variations_combination?.product_variations_values?.length > 0 &&
                await Promise.all(order_item?.product_variations_combination?.product_variations_values.map(async (variations) => (
                        variation_html_body +=`${variations.attribute?.name || ''}: ${variations.attribute_value.attribute_value}<br/>`
                    ),
                ))
                product_body += `<tr>
                <td class="esd-structure esdev-adapt-off es-p10t es-p10b es-p20r es-p20l" align="left" esd-custom-block-id="388986">
                    <table width="560" cellpadding="10" cellspacing="0" class="esdev-mso-table">
                        <tbody>
                            <tr>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="padding-left::30px">
                                        <tbody>
                                            <tr>
                                                <td width="70" class="es-m-p0r esd-container-frame" align="center">
                                                    <table cellpadding="0" cellspacing="0" width="100%" style="border-left:2px solid #efefef;border-right:2px solid #efefef;border-top:2px solid #efefef;border-bottom:2px solid #efefef;">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                    <a target="_blank" href="http://143.110.190.232/product?id=${order_item.product.id}"><img class="adapt-img" src="${order_item.product.image}" alt="" style="display: block;" width="66"></a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                        <tbody>
                                            <tr>
                                                <td width="265" class="esd-container-frame" align="center">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>${order_item.product.name}</strong> <br />${variation_html_body}</p>
                                                                </td>
                                                            </tr>
                                                            
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                        <tbody>
                                            <tr>
                                                <td width="80" align="left" class="esd-container-frame">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">${order_item.qty} qty</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                        <tbody>
                                            <tr>
                                                <td width="85" align="left" class="esd-container-frame">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="right" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">${orderData.currency_symbol}${order_item.qty*order_item.price}</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                </tr>`
                }))
                product_body+=`<tr>
                <td class="esd-structure es-p10t es-p20r es-p20l" align="left">
                <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                <tr>
                    <td width="560" class="es-m-p0r esd-container-frame" align="center">
                        <table cellpadding="0" cellspacing="0" width="100%" style="border-top: 2px solid #efefef; border-bottom: 2px solid #efefef;padding-right:30px">
                            <tbody>
                                <tr>
                                    <td align="right" class="esd-block-text es-m-txt-r es-p10t es-p20b es-p40r">
                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Subtotal:&nbsp;&nbsp;<strong>${orderData.currency_symbol} ${orderData.sub_total}</strong></p>
                                        <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Shipping:&nbsp;&nbsp;<strong>${orderData.currency_symbol} ${orderData.shipping_charge}</strong><br>Discount:&nbsp; <strong>${orderData.currency_symbol} ${orderData.discount_total}</strong></strong><br>---------------------<br>Total:&nbsp;&nbsp;<strong>${orderData.currency_symbol} ${orderData.total}</strong><br></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>`
                product_body+=`<tr>
                <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left">
                <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="280" valign="top"><![endif]-->
                <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                <tbody>
                <tr>
                <td width="280" class="es-m-p0r esd-container-frame es-m-p20b" align="center">
                    <table cellpadding="0" cellspacing="0" width="100%" style="padding-left:30px">
                        <tbody>
                            <tr>
                                <td align="left" class="esd-block-text">
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Customer:</strong> ${orderData.shipping_first_name} ${orderData.shipping_last_name}</p>
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Order ID:</strong>&nbsp;#${orderData.order_number}</p>
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Invoice Date:</strong>&nbsp;${orderData.order_date}</p>
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Payment Method:</strong>&nbsp;${orderData.payment_type}</p>
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>Currency:</strong>&nbsp;${orderData.currency_symbol}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if mso]></td><td width="0"></td><td width="280" valign="top"><![endif]-->
                <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                <tbody>
                <tr>
                <td width="280" class="es-m-p0r esd-container-frame" align="center">
                    <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                            <tr>
                                <td align="right" class="esd-block-text es-m-txt-l es-p35r">
                                <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333;padding-right:30px"><strong>Shipping Method: </strong>${orderData.shipping_method.name}</p>
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333;padding-right:30px"><strong>Shipping Address: </strong>${orderData.shipping_street_address}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if mso]></td></tr></table><![endif]-->
                </td>
                </tr><tr>
                <td class="esd-structure es-p15t es-p10b es-p20r es-p20l" align="left">
                <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                <tr>
                <td width="560" align="left" class="esd-container-frame">
                    <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                            <tr>
                                <td align="center" class="esd-block-spacer es-p20" style="font-size:0">
                                    <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr>
                                                <td style="border-bottom: 2px solid #cccccc; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" class="esd-block-text es-p10t es-p10b" esd-links-color="#5a6edf">
                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">Got a question?&nbsp;Email us at&nbsp;<a target="_blank" href="mailto:info@somashop.com" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">info@somashop.com</a>&nbsp;or give us a call at&nbsp;
                                        <a target="_blank" href="tel:+919116653338" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">+91 9116653338</a>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                `
                try {
                    settings.findOne()
                    .then(async data => {
                        settingsdata = (data)
                        let response=''
                        let transporte = nodemailer.createTransport({
                            host: data.smtp_host,
                            port: data.smtp_port,
                            auth: {
                                user: data.smtp_username,
                                pass: data.smtp_password,
                            },
                        })
                    transporte.sendMail({
                from: data.smtp_mail_from_name+'<'+data.smtp_mail_from_address+'>',
                to: email,
                subject: "Your order has been shipped",
                html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                        <meta charset="UTF-8">
                        <meta content="width=device-width:intial-scale=1.0;maximum-scale=1.0;user-scalable=no;" name="viewport">
                        <meta name="x-apple-disable-message-reformatting">
                        <style>
                        @media screen (max-width:630px){
                            table{width:100%}
                            }
                            </style>
                    </head>
                        <body data-new-gr-c-s-loaded="14.1073.0">
                    <div class="es-wrapper-color" style="background-color: #efefef;">
                        <!--[if gte mso 9]>
                            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                <v:fill type="tile" color="#efefef"></v:fill>
                            </v:background>
                        <![endif]-->
                        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td class="esd-email-paddings" valign="top">
                                        <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-stripe" align="center" esd-custom-block-id="388982">
                                                        <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-structure es-p20" align="left" bgcolor="#ffe54a" esd-custom-block-id="717808">
                                                                        <table cellpadding="20" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center">
                                                                                        <table cellpadding="10" cellspacing="0" width="100%">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-image es-p10b" style="font-size: 0px;">
                                                                                                        <a target="_blank"><img src="https://jwwryi.stripocdn.email/content/guids/CABINET_224138b5cf3b11ddb673c54b04987c31/images/navlog.png" alt="Logo" style="display: block; font-size: 12px;" width="200" title="Logo" class="adapt-img"></a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table><table cellpadding="0" cellspacing="0" class="es-content" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-stripe" align="center">
                                                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                        <tbody>
                                                        <tr>
                                                                <td class="esd-structure es-p15t es-p20r es-p20l" align="left">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-image es-p10t es-p10b" style="font-size: 0px;">
                                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/72301618403900832.png" alt="" style="display: block; margin-top:40px;width:100px” width="100"></a>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-p10b es-m-txt-c">
                                                                                                    <h1 style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style: normal;font-weight: bold; color: #333333;margin:0px">Track your order</h1>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                    <td align="center" class="esd-block-text es-m-txt-c">
                                                                                                        <h2 style="font-size: 26px;font-style: normal;font-weight: bold;color: #333333;">Order&nbsp;<a target="_blank">#${orderData.order_number}</a>&nbsp;has been shipped!&nbsp;
                                                                                                        
                                                                                                        </h2>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-button es-p25t es-p15b"><span class="es-button-border" style="border-radius: 6px; border-width: 2px; border-color: transparent; background: transparent;"><a href="http://143.110.190.232/track-order?id=${orderData.awb_number}" class="es-button" target="_blank" style="border-left-width: 30px; border-right-width: 30px; border-radius: 6px; font-family: &quot;times new roman&quot;, times, baskerville, georgia, serif; background: #cc0000; border-color: #cc0000;text-decoration:none;color:#ffffff;padding:10px 21px">
                                                                                                                <!--[if !mso]><!-- --><img src="http://143.110.190.232/assets/images/Track.png" alt="icon" class="esd-icon-left" style="margin-right:10px;" align="absmiddle" height="18">
                                                                                                                <!--<![endif]-->Track Your Order
                                                                                                            </a></span></td>
                                                                                                </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                
                                                            <tr>
                                                                <td class="esd-structure" align="left">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="600" class="esd-container-frame" align="center" valign="top">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-spacer es-p20t es-p20r es-p20l" style="font-size: 0px;">
                                                                                                    <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td style="border-bottom: 2px solid #efefef; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        ${product_body}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-stripe" align="center" esd-custom-block-id="717807">
                                                    <table class="es-footer-body" align="center" cellpadding="20" cellspacing="0" width="600" style="background-color: transparent;">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-structure es-p20" align="left" bgcolor="#ffffff" style="background-color: #ffffff;">
                                                                    <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="143" valign="top"><![endif]-->
                                                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="133" class="es-m-p0r es-m-p20b esd-container-frame" align="center">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/17971617974647919.png" alt style="display: block;" width="45"></a>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">FREE <br>SHIPPING</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                                <td class="es-hidden" width="10"></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if mso]></td><td width="143" valign="top"><![endif]-->
                                                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="133" class="es-m-p20b esd-container-frame" align="center">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/80801617974647921.png" alt style="display: block;" width="45"></a>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">EASY <br>PAYMENT</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                                <td class="es-hidden" width="10"></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if mso]></td><td width="132" valign="top"><![endif]-->
                                                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="132" align="center" class="esd-container-frame es-m-p20b">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/77861617974647919.png" alt style="display: block;" width="45"></a>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUICK <br>RETURN</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if mso]></td><td width="10"></td><td width="132" valign="top"><![endif]-->
                                                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="132" align="center" class="esd-container-frame">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/59831617975283573.png" alt style="display: block;" width="45"></a>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUALITY ASSURANCE</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left" bgcolor="#d12421" style="background-color: #d12421;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="560" class="esd-container-frame" align="left">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                                                                                    <table cellpadding="5" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="center" valign="top" class="es-p40r">
                                                                                                                    <a target="_blank" href="https://www.facebook.com/SomaBlockprints/"><img title="Facebook" src="http://143.110.190.232/assets/images/facebook-logo-white.png" alt="Fb" width="32"></a>
                                                                                                                </td>
                                                                                                                <td align="center" valign="top" class="es-p40r">
                                                                                                                    <a target="_blank" href="https://twitter.com/somablockprints"><img title="Twitter" src="http://143.110.190.232/assets/images/twitter-logo-white.png" alt="Tw" width="32"></a>
                                                                                                                </td>
                                                                                                                <td align="center" valign="top" class="es-p40r">
                                                                                                                    <a target="_blank" href="https://www.instagram.com/somablockprints/"><img title="Instagram" src="http://143.110.190.232/assets/images/instagram-logo-white.png" alt="Instagram" width="32"></a>
                                                                                                                </td>
                                                                                                                <td align="center" valign="top">
                                                                                                                    <a target="_blank" href="https://www.youtube.com/channel/UCbe4E2pO4959tkfHxbe5YTg"><img title="Youtube" src="http://143.110.190.232/assets/images/youtube-logo-white.png" alt="Youtube" width="32"></a>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-p35b">
                                                                                                    <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-bottom:0px">Soma&nbsp;© 2021 Soma Block Prints Pvt. Ltd. All Rights Reserved.</p>
                                                                                                    <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-top:0px">Soma House, 2-B Girnar Extn.<br>Khatipura, Jaipur 302012,<br>Rajasthan, India</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-divider="1|solid|#ffffff" esd-tmp-menu-color="#ffffff">
                                                                                                    <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                                        <tbody>
                                                                                                            <tr class="links">
                                                                                                                <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="https://www.somashop.com/" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Visit Us</a></td>
                                                                                                                <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/privacy-policy" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Privacy Policy</a></td>
                                                                                                                <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/terms-and-conditions" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Terms of Use</a></td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-stripe" align="center" esd-custom-block-id="388983">
                                                    <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-structure es-p20" align="left">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-infoblock">
                                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">
                                                                                                        No longer want to receive these emails?&nbsp;<a href target="_blank" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">Unsubscribe</a>.
                                                                                                    </p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </body>
                
                </html>`
                })
                
                
                
                    })
                } catch (error) {
                }
                
    console.log('mail sent successfully')
    } catch (error) {
    console.log(error)
    return error
    }   
    }

    async sendOrderDelivered(email, orderData) {
        try{
            let product_body = ''
            await Promise.all(orderData.order_items.map(async (order_item) => {
                let variation_html_body = ''
                order_item?.product_variations_combination?.product_variations_values?.length > 0 &&
                await Promise.all(order_item?.product_variations_combination?.product_variations_values.map(async (variations) => (
                        variation_html_body +=`${variations.attribute?.name || ''}: ${variations.attribute_value.attribute_value}<br/>`
                    ),
                ))
                product_body += ` <tr>
                <td class="esd-structure es-p20t es-p20r es-p20l" align="left" >
                    <!--[if mso]><table width="558" cellpadding="0"
    cellspacing="0"><tr><td width="179" valign="top"><![endif]-->
                    <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                        <tbody>
                            <tr>
                                <td class="es-m-p0r es-m-p20b esd-container-frame" width="179" valign="top" align="center">
                                    <table style="border-left:2px solid #efefef;border-right:2px solid #efefef;border-top:2px solid #efefef;border-bottom:2px solid #efefef;background-color: #ffffff;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                        <tbody>
                                            <tr>
                                                <td class="esd-block-image es-p10t es-p10b" align="center" style="font-size:0">
                                                    <a target="_blank" href="http://143.110.190.232/product?id=${order_item.product.id}"><img src="${order_item.product.image}" alt="Polo" title="Polo" width="112"></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!--[if mso]></td><td width="20"></td><td width="359" valign="top"><![endif]-->
                    <table cellspacing="0" cellpadding="0" align="right">
                        <tbody>
                            <tr>
                                <td class="esd-container-frame" width="359" align="left">
                                    <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td class="esd-block-text es-p20b" bgcolor="#ffffff" align="left">
                                                    <p style="font-size: 16px;color: #333333;font-family: 'arial', 'helvetica neue', 'helvetica', 'sans-serif';">${order_item.product.name}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="esd-block-button" bgcolor="#ffffff" align="left"><span class="es-button-border" style="background: #f7f6f2 none repeat scroll 0% 0%; border-width: 1px;border-style: solid solid solid solid;border-color: #836027 #836027 #836027 #836027;"><a href="http://143.110.190.232/product?id=${order_item.product.id}" class="es-button" target="_blank" style="border-left-width: 30px; border-right-width: 30px; background: #f7f6f2 none repeat scroll 0% 0%; border-color: #f7f6f2;border-style: solid;border-width: 5px 30px 5px 30px;display: inline-block;border-radius: 0px;font-size: 18px;font-family: georgia, times, 'times new roman', serif;font-weight: normal;font-style: normal;line-height: 120%;color: #836027;width: auto;text-align: center;">Write a review</a></span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!--[if mso]></td></tr></table><![endif]-->
                </td>
            </tr>
            <tr>
                <td class="esd-structure es-p20r es-p20l" align="left">
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td class="esd-container-frame" width="558" valign="top" align="center">
                                    <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td class="esd-block-spacer es-p20t es-p20b" align="center" style="font-size:0">
                                                    <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td style="border-bottom: 1px solid #d7d7dc; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>`
                }))
            
                try {
                    settings.findOne()
                    .then(async data => {
                        settingsdata = (data)
                        let response=''
                        let transporte = nodemailer.createTransport({
                            host: data.smtp_host,
                            port: data.smtp_port,
                            auth: {
                                user: data.smtp_username,
                                pass: data.smtp_password,
                            },
                        })
                    transporte.sendMail({
                from: data.smtp_mail_from_name+'<'+data.smtp_mail_from_address+'>',
                to: email,
                subject: "Your order has been delivered",
                html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                        <meta charset="UTF-8">
                        <meta content="width=device-width:intial-scale=1.0;maximum-scale=1.0;user-scalable=no;" name="viewport">
                        <meta name="x-apple-disable-message-reformatting">
                        <style>
                        @media screen (max-width:630px){
                            table{width:100%}
                            }
                            </style>
                    </head>
                        <body data-new-gr-c-s-loaded="14.1073.0">
                    <div class="es-wrapper-color" style="background-color: #efefef;">
                        <!--[if gte mso 9]>
                            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                <v:fill type="tile" color="#efefef"></v:fill>
                            </v:background>
                        <![endif]-->
                        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td class="esd-email-paddings" valign="top">
                                        <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-stripe" align="center" esd-custom-block-id="388982">
                                                        <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-structure es-p20" align="left" bgcolor="#ffe54a" esd-custom-block-id="717808">
                                                                        <table cellpadding="20" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center">
                                                                                        <table cellpadding="10" cellspacing="0" width="100%">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-image es-p10b" style="font-size: 0px;">
                                                                                                        <a target="_blank"><img src="https://jwwryi.stripocdn.email/content/guids/CABINET_224138b5cf3b11ddb673c54b04987c31/images/navlog.png" alt="Logo" style="display: block; font-size: 12px;" width="200" title="Logo" class="adapt-img"></a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-stripe" align="center">
                                                        <table class="es-content-body" style="border-left:1px solid #836027;border-right:1px solid #836027;border-top:1px solid transparent;background-color: #836027;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-structure esdev-adapt-off es-p30b es-p20r es-p20l" align="left">
                                                                        <table class="esdev-mso-table" width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esdev-mso-td" valign="top">
                                                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td class="es-m-p0r esd-container-frame" width="99" align="center">
                                                                                                        <table width="100%" cellspacing="0" cellpadding="0" style=" padding-top: 55px;">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td class="esd-block-spacer es-p40t es-p10b" align="center" style="font-size:0">
                                                                                                                        <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td style="border-bottom: 1px solid #ffffff; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                    <td width="20"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                    <td class="esdev-mso-td" valign="top">
                                                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="center">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td class="es-m-p20b esd-container-frame" width="319" align="center">
                                                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td class="esd-block-text es-p10t" align="center">
                                                                                                                        <h2 style="color: #ffffff;    font-family: 'times new roman', times, baskerville, georgia, serif;font-size: 24px;font-weight:normal">What did you think of your recent purchase?</h2>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                    <td width="20"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                    <td class="esdev-mso-td" valign="top">
                                                                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td class="esd-container-frame" width="100" align="center">
                                                                                                        <table width="100%" cellspacing="0" cellpadding="0" style=" padding-top: 55px;">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td class="esd-block-spacer es-p40t es-p10b" align="center" style="font-size:0">
                                                                                                                        <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td style="border-bottom: 1px solid #ffffff; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-stripe" align="center">
                                                        <table class="es-content-body" style="border-left: 1px solid #836027; border-right: 1px solid #836027; border-bottom: 1px solid #836027; background-color: #ffffff;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-container-frame" width="558" valign="top" align="center">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td class="esd-block-text" align="center">
                                                                                                        <p style="color: #333333;font-family: 'arial', 'helvetica neue', 'helvetica', 'sans-serif';font-size: 16px;">Please leave a review. We want to note that we constantly conduct work on improvement of quality of service, and we will be very grateful if you leave the opinion.
                                                                                                            Your reviews keep us constantly improving, while helping other people make the right choice.</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                ${product_body}        
                                                                <tr>
                                                                    <td class="esd-structure es-p20r es-p20l" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-container-frame" width="558" valign="top" align="center">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td class="esd-block-text es-p15t es-p15b" bgcolor="#ecebf1" align="center" esd-links-underline="none">
                                                                                                        <h1 style="color: #836027;font-size: 40px;    font-family: 'times new roman', times, baskerville, georgia, serif;">Call us 24/7 at +
                                                                                                        91-9116653338
                                                                                                        </h1>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-stripe" align="center" esd-custom-block-id="717807">
                                                    <table class="es-footer-body" align="center" cellpadding="20" cellspacing="0" width="600" style="background-color: transparent;">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-structure es-p20" align="left" bgcolor="#ffffff" style="background-color: #ffffff;">
                                                                    <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="143" valign="top"><![endif]-->
                                                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="133" class="es-m-p0r es-m-p20b esd-container-frame" align="center">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/17971617974647919.png" alt style="display: block;" width="45"></a>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">FREE <br>SHIPPING</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                                <td class="es-hidden" width="10"></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if mso]></td><td width="143" valign="top"><![endif]-->
                                                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="133" class="es-m-p20b esd-container-frame" align="center">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/80801617974647921.png" alt style="display: block;" width="45"></a>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">EASY <br>PAYMENT</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                                <td class="es-hidden" width="10"></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if mso]></td><td width="132" valign="top"><![endif]-->
                                                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="132" align="center" class="esd-container-frame es-m-p20b">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/77861617974647919.png" alt style="display: block;" width="45"></a>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUICK <br>RETURN</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if mso]></td><td width="10"></td><td width="132" valign="top"><![endif]-->
                                                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="132" align="center" class="esd-container-frame">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                    <a target="_blank"><img src="http://143.110.190.232/assets/images/59831617975283573.png" alt style="display: block;" width="45"></a>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUALITY ASSURANCE</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left" bgcolor="#d12421" style="background-color: #d12421;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="560" class="esd-container-frame" align="left">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                                                                                    <table cellpadding="5" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="center" valign="top" class="es-p40r">
                                                                                                                    <a target="_blank" href="https://www.facebook.com/SomaBlockprints/"><img title="Facebook" src="http://143.110.190.232/assets/images/facebook-logo-white.png" alt="Fb" width="32"></a>
                                                                                                                </td>
                                                                                                                <td align="center" valign="top" class="es-p40r">
                                                                                                                    <a target="_blank" href="https://twitter.com/somablockprints"><img title="Twitter" src="http://143.110.190.232/assets/images/twitter-logo-white.png" alt="Tw" width="32"></a>
                                                                                                                </td>
                                                                                                                <td align="center" valign="top" class="es-p40r">
                                                                                                                    <a target="_blank" href="https://www.instagram.com/somablockprints/"><img title="Instagram" src="http://143.110.190.232/assets/images/instagram-logo-white.png" alt="Instagram" width="32"></a>
                                                                                                                </td>
                                                                                                                <td align="center" valign="top">
                                                                                                                    <a target="_blank" href="https://www.youtube.com/channel/UCbe4E2pO4959tkfHxbe5YTg"><img title="Youtube" src="http://143.110.190.232/assets/images/youtube-logo-white.png" alt="Youtube" width="32"></a>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-p35b">
                                                                                                    <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-bottom:0px">Soma&nbsp;© 2021 Soma Block Prints Pvt. Ltd. All Rights Reserved.</p>
                                                                                                    <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-top:0px">Soma House, 2-B Girnar Extn.<br>Khatipura, Jaipur 302012,<br>Rajasthan, India</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-divider="1|solid|#ffffff" esd-tmp-menu-color="#ffffff">
                                                                                                    <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                                        <tbody>
                                                                                                            <tr class="links">
                                                                                                                <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="https://www.somashop.com/" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Visit Us</a></td>
                                                                                                                <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/privacy-policy" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Privacy Policy</a></td>
                                                                                                                <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/terms-and-conditions" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Terms of Use</a></td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-stripe" align="center" esd-custom-block-id="388983">
                                                    <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-structure es-p20" align="left">
                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" class="esd-block-text es-infoblock">
                                                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">
                                                                                                        No longer want to receive these emails?&nbsp;<a href target="_blank" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">Unsubscribe</a>.
                                                                                                    </p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </body>
                
                </html>`
                })
                
                
                
                    })
                } catch (error) {
                }
                
    console.log('mail sent successfully')
    } catch (error) {
    console.log(error)
    return error
    }   
    }

    async sendOrderConfirmationEmail(email, orderData) {
        try{
            let product_body = ''
            await Promise.all(orderData.order_items.map(async (order_item) => {
                let variation_html_body = ''
                order_item?.product_variations_combination?.product_variations_values?.length > 0 &&
                await Promise.all(order_item?.product_variations_combination?.product_variations_values.map(async (variations) => (
                        variation_html_body +=`${variations.attribute?.name || ''}: ${variations.attribute_value.attribute_value}<br/>`
                    ),
                ))
                
                product_body += `<tr>
                    <td class="esd-structure esdev-adapt-off es-p10t es-p10b es-p20r es-p20l" align="left" esd-custom-block-id="388986" style="padding: 0; Margin: 0; padding-top: 10px; padding-bottom: 10px; padding-left: 20px; padding-right: 20px;">
                        <table width="560" cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                            <tbody>
                                <tr>
                                    <td class="esdev-mso-td" valign="top" style="padding: 0; Margin: 0;">
                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: left;">
                                            <tbody>
                                                <tr>
                                                    <td width="70" class="es-m-p0r esd-container-frame" align="center" style="padding: 0; Margin: 0;">
                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; border-left: 2px solid #efefef; border-right: 2px solid #efefef; border-top: 2px solid #efefef; border-bottom: 2px solid #efefef;">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" class="esd-block-image" style="padding: 0; Margin: 0; font-size: 0px;">
                                                                        <a target="_blank" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #5c68e2; font-size: 16px;"><img class="adapt-img" src="${order_item.product.image}" alt style="border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block;" width="66"></a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td width="20" style="padding: 0; Margin: 0;"></td>
                                    <td class="esdev-mso-td" valign="top" style="padding: 0; Margin: 0;">
                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: left;">
                                            <tbody>
                                                <tr>
                                                    <td width="265" class="esd-container-frame" align="center" style="padding: 0; Margin: 0;">
                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" class="esd-block-text" style="padding: 0; Margin: 0;">
                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;"><strong>${order_item.product.name}</strong></p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left" class="esd-block-text" style="padding: 0; Margin: 0;">
                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;">
                                                                            ${variation_html_body}
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td width="20" style="padding: 0; Margin: 0;"></td>
                                    <td class="esdev-mso-td" valign="top" style="padding: 0; Margin: 0;">
                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: left;">
                                            <tbody>
                                                <tr>
                                                    <td width="80" align="left" class="esd-container-frame" style="padding: 0; Margin: 0;">
                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" class="esd-block-text" style="padding: 0; Margin: 0;">
                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;">${order_item.qty} qty</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td width="20" style="padding: 0; Margin: 0;"></td>
                                    <td class="esdev-mso-td" valign="top" style="padding: 0; Margin: 0;">
                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: right;">
                                            <tbody>
                                                <tr>
                                                    <td width="85" align="left" class="esd-container-frame" style="padding: 0; Margin: 0;">
                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" class="esd-block-text" style="padding: 0; Margin: 0;">
                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;">${orderData.currency_symbol}${order_item.qty*order_item.price}</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>`
            }))
            
            transport.sendMail({
                from: '"Soma" <'+user+'>',
                to: email,
                subject: "Your Order is Placed Successfully",
                html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family: arial, 'helvetica neue', helvetica, sans-serif;">
                
                <head>
                    <meta charset="UTF-8">
                    <meta content="width=device-width, initial-scale=1" name="viewport">
                    <meta name="x-apple-disable-message-reformatting">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta content="telephone=no" name="format-detection">
                    <title></title>
                </head>
                
                <body data-new-gr-c-s-loaded="14.1073.0" style="width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; padding: 0; Margin: 0; font-family: arial, 'helvetica neue', helvetica, sans-serif;">
                    <div style="background-color: #efefef;">
                        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; padding: 0; Margin: 0; width: 100%; height: 100%; background-repeat: repeat; background-position: center top; background-color: #efefef;" height="100%" bgcolor="#efefef">
                            <tbody>
                                <tr>
                                    <td class="esd-email-paddings" valign="top" style="padding: 0; Margin: 0;">
                                        <table cellpadding="0" cellspacing="0" class="es-header esd-header-popover" align="center" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; width: 100%; background-color: transparent; background-repeat: repeat; background-position: center top; table-layout: fixed;" width="100%" bgcolor="transparent">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-stripe" align="center" esd-custom-block-id="388981" style="padding: 0; Margin: 0;">
                                                        <table bgcolor="transparent" class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: transparent;">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-structure es-p20" align="left" bgcolor="#ffe54a" style="Margin: 0; padding: 20px; background-color: #ffe54a;" esd-custom-block-id="717808">
                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-image es-p10b" style="padding: 0; Margin: 0; padding-bottom: 10px; font-size: 0px;">
                                                                                                        <a target="_blank" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #666666; font-size: 14px;"><img src="https://jwwryi.stripocdn.email/content/guids/CABINET_224138b5cf3b11ddb673c54b04987c31/images/navlog.png" alt="Logo" style="border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block; font-size: 12px;" width="200" title="Logo" class="adapt-img"></a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; width: 100%; table-layout: fixed;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-stripe" align="center" style="padding: 0; Margin: 0;">
                                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: #ffffff;">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-structure es-p15t es-p20r es-p20l" align="left" style="padding: 0; Margin: 0; padding-top: 15px; padding-left: 20px; padding-right: 20px;">
                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="560" class="esd-container-frame" align="center" valign="top" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-image es-p10t es-p10b" style="padding: 0; Margin: 0; padding-top: 10px; padding-bottom: 10px; font-size: 0px;">
                                                                                                        <a target="_blank" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #5c68e2; font-size: 16px;"><img src="${env.mail_template_image}84141618400759579.png" alt="" style="border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block;" width="100"></a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-text es-m-txt-c" style="padding: 0; Margin: 0;">
                                                                                                        <h1 style="Margin: 0; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; font-style: normal; font-weight: bold; color: #333333; font-size: 46px; line-height: 100%;">Order confirmation</h1>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; width: 100%; table-layout: fixed;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-stripe esd-synchronizable-module" align="center" esd-custom-block-id="718041" style="padding: 0; Margin: 0;">
                                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: #ffffff;">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-structure es-p20" align="left" style="Margin: 0; padding: 20px;">
                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="560" class="esd-container-frame" align="center" valign="top" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-text es-m-txt-c" style="padding: 0; Margin: 0;">
                                                                                                        <h2 style="Margin: 0; line-height: 120%; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; font-size: 26px; font-style: normal; font-weight: bold; color: #333333;">Order&nbsp;<a target="_blank" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #5c68e2; font-size: 26px;">#${orderData.order_number}</a></h2>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l" style="padding: 0; Margin: 0; padding-top: 5px; padding-bottom: 5px; padding-left: 40px; padding-right: 40px;">
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;">${orderData.order_date}</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-text es-p5t es-p15b es-p40r es-p40l es-m-p0r es-m-p0l" style="padding: 0; Margin: 0; padding-top: 5px; padding-bottom: 15px; padding-left: 40px; padding-right: 40px;">
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;">This email is to confirm&nbsp;your order. We will send you another email as soon as it ships.</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="esd-structure" align="left" style="padding: 0; Margin: 0;">
                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="600" class="esd-container-frame" align="center" valign="top" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-spacer es-p5t es-p20b es-p20r es-p20l" style="padding: 0; Margin: 0; padding-top: 5px; padding-bottom: 20px; padding-left: 20px; padding-right: 20px; font-size: 0px;">
                                                                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td style="padding: 0; Margin: 0; border-bottom: 2px solid #efefef; background: unset; height: 1px; width: 100%; margin: 0px;" width="100%" height="1"></td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="esd-structure" align="left" style="padding: 0; Margin: 0;">
                                                                        <!--[if mso]><table width="600" cellpadding="0" cellspacing="0"><tr><td width="290" valign="top"><![endif]-->
                                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: left;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="290" class="es-m-p20b esd-container-frame" align="left" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-button" style="padding: 0; Margin: 0;"><span class="es-button-border" style="border-style: solid solid solid solid; display: inline-block; width: auto; border-radius: 6px; border-color: #cc0000; background: #cc0000; border-width: 2px;"><a href="" class="es-button es-button-1660378113915" target="_blank" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; border-style: solid; display: inline-block; font-weight: normal; font-style: normal; line-height: 120%; color: #ffffff; width: auto; text-align: center; border-radius: 6px; font-family: 'times new roman', times, baskerville, georgia, serif; background: #cc0000; border-color: #cc0000; border-width: 0px 30px; font-size: 18px; mso-style-priority: 100; text-decoration: none;">
                                                                                                        <a href="${env.BASEURL}'/'${env.invoice_path}'/'${orderData.order_number}.pdf" class="es-button es-button-1660378540032" target="_blank" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; border-style: solid; display: inline-block; font-weight: normal; font-style: normal; line-height: 120%; color: #ffffff; width: auto; text-align: center; border-radius: 6px; font-family: 'times new roman', times, baskerville, georgia, serif; background: #cc0000; border-color: #cc0000; border-width: 0px 15px; font-size: 18px; mso-style-priority: 100; text-decoration: none;">
                                                                                                            <!--[if !mso]><!-- --><img src="${env.mail_template_image}pdf_icz.png" alt="icon" width="16" class="esd-icon-left" style="border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: inline-block; vertical-align: middle; margin-right: 10px;" align="absmiddle">
                                                                                                                    <!--<![endif]-->Invoice
                                                                                                                </a></span>
                                                                                                            <esd-config-block value="{&quot;configClass&quot;:&quot;es-button-1660378113915&quot;,&quot;rule&quot;:&quot;[data-ogsb] .es-button.es-button-1660378113915&quot;,&quot;properties&quot;:{&quot;padding&quot;:&quot;0px 30px !important&quot;}}" name="btnIndentSettingsControl" style="display: none;"></esd-config-block>
                                                                                                        </a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if mso]></td><td width="20"></td><td width="290" valign="top"><![endif]-->
                                                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: right;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="290" align="left" class="esd-container-frame" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-button" style="padding: 0; Margin: 0;"><span class="es-button-border" style="border-style: solid solid solid solid; display: inline-block; width: auto; border-radius: 6px; border-color: #cc0000; background: #cc0000; border-width: 2px;"><a href="${env.BASEURL}track-order?id=${orderData.awb_number}" class="es-button es-button-1660378540032" target="_blank" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; border-style: solid; display: inline-block; font-weight: normal; font-style: normal; line-height: 120%; color: #ffffff; width: auto; text-align: center; border-radius: 6px; font-family: 'times new roman', times, baskerville, georgia, serif; background: #cc0000; border-color: #cc0000; border-width: 0px 15px; font-size: 18px; mso-style-priority: 100; text-decoration: none;">
                                                                                                                <!--[if !mso]><!-- --><img src="${env.mail_template_image}track.png" alt="icon" width="16" class="esd-icon-left" style="border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: inline-block; vertical-align: middle; margin-right: 10px;" align="absmiddle">
                                                                                                                <!--<![endif]-->Track Order
                                                                                                            </a></span>
                                                                                                        <esd-config-block value="{&quot;configClass&quot;:&quot;es-button-1660378540032&quot;,&quot;rule&quot;:&quot;[data-ogsb] .es-button.es-button-1660378540032&quot;,&quot;properties&quot;:{&quot;padding&quot;:&quot;0px 15px !important&quot;}}" name="btnIndentSettingsControl" style="display: none;"></esd-config-block>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="esd-structure" align="left" style="padding: 0; Margin: 0;">
                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="600" class="esd-container-frame" align="center" valign="top" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-spacer es-p20t es-p20r es-p20l" style="padding: 0; Margin: 0; padding-top: 20px; padding-left: 20px; padding-right: 20px; font-size: 0px;">
                                                                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td style="padding: 0; Margin: 0; border-bottom: 2px solid #efefef; background: unset; height: 1px; width: 100%; margin: 0px;" width="100%" height="1"></td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                ${product_body}
                                                                <tr>
                                                                    <td class="esd-structure es-p10t es-p20r es-p20l" align="left" style="padding: 0; Margin: 0; padding-top: 10px; padding-left: 20px; padding-right: 20px;">
                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="560" class="es-m-p0r esd-container-frame" align="center" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; border-top: 2px solid #efefef; border-bottom: 2px solid #efefef;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="right" class="esd-block-text es-m-txt-r es-p10t es-p20b es-p40r" style="padding: 0; Margin: 0; padding-top: 10px; padding-bottom: 20px; padding-right: 40px;">
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px; text-align: right;">Subtotal:&nbsp;&nbsp;<strong>${orderData.currency_symbol}${orderData.sub_total}</strong></p>
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;">Shipping:&nbsp;&nbsp;<strong>${orderData.currency_symbol}00.00</strong><br>Discount:&nbsp; <strong>${orderData.currency_symbol}00.00</strong><br>Tax:&nbsp;&nbsp;<strong>${orderData.currency_symbol}00.00</strong><br>---------------------<br>Total:&nbsp;&nbsp;<strong>${orderData.currency_symbol}${orderData.total}</strong><br></p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left" style="padding: 0; Margin: 0; padding-bottom: 10px; padding-top: 20px; padding-left: 20px; padding-right: 20px;">
                                                                        <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="280" valign="top"><![endif]-->
                                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: left;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="280" class="es-m-p0r esd-container-frame es-m-p20b" align="center" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="left" class="esd-block-text" style="padding: 0; Margin: 0;">
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;"><strong>Customer:</strong> ${orderData.user.name}</p>
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;"><strong>Order ID:</strong>&nbsp;#${orderData.order_number}</p>
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;"><strong>Invoice Date:</strong>&nbsp;${orderData.order_date}</p>
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;"><strong>Payment Method:</strong>&nbsp;${orderData.payment_type}</p>
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;"><strong>Currency:</strong>&nbsp;${orderData.currency}</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if mso]></td><td width="0"></td><td width="280" valign="top"><![endif]-->
                                                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: right;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="280" class="es-m-p0r esd-container-frame" align="center" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="right" class="esd-block-text es-m-txt-l es-p35r" style="padding: 0; Margin: 0; padding-right: 35px;">
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;"><strong>Shipping Method:</strong> UPS - Ground</p>
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;"><strong>Shipping Address: </strong>${orderData.shipping_first_name} ${orderData.shipping_last_name},<br>${orderData.shipping_street_address},<br>${orderData.shipping_country}, ${orderData.shipping_state} ${orderData.shipping_postcode}</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="esd-structure es-p15t es-p10b es-p20r es-p20l" align="left" style="padding: 0; Margin: 0; padding-bottom: 10px; padding-top: 15px; padding-left: 20px; padding-right: 20px;">
                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="560" align="left" class="esd-container-frame" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-spacer es-p20" style="Margin: 0; padding: 20px; font-size: 0;">
                                                                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td style="padding: 0; Margin: 0; border-bottom: 2px solid #cccccc; background: unset; height: 1px; width: 100%; margin: 0px;" width="100%" height="1"></td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-text es-p10t es-p10b" esd-links-color="#5a6edf" style="padding: 0; Margin: 0; padding-top: 10px; padding-bottom: 10px;">
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;">Got a question?&nbsp;Email us at&nbsp;<a target="_blank" href="mailto:info@somashop.com" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; font-size: 16px; color: #5a6edf;">info@somashop.com</a>&nbsp;or give us a call at&nbsp;
                                                                                                            <a target="_blank" href="tel:+919116653338" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; font-size: 16px; color: #5a6edf;">+91 9116653338</a>
                                                                                                        </p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; width: 100%; background-color: transparent; background-repeat: repeat; background-position: center top; table-layout: fixed;" width="100%" bgcolor="transparent">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-stripe esd-synchronizable-module" align="center" esd-custom-block-id="717807" style="padding: 0; Margin: 0;">
                                                        <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="600" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: transparent;" bgcolor="transparent">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-structure es-p20" align="left" bgcolor="#ffffff" style="Margin: 0; padding: 20px; background-color: #ffffff;">
                                                                        <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="143" valign="top"><![endif]-->
                                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: left;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="133" class="es-m-p0r es-m-p20b esd-container-frame" align="center" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-image" style="padding: 0; Margin: 0; font-size: 0px;">
                                                                                                        <a target="_blank" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #333333; font-size: 16px;"><img src="${env.mail_template_image}17971617974647919.png" alt="" style="border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block;" width="45"></a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-text es-p10t es-p10b" style="padding: 0; Margin: 0; padding-top: 10px; padding-bottom: 10px;">
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;">FREE <br>SHIPPING</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                    <td class="es-hidden" width="10" style="padding: 0; Margin: 0;"></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if mso]></td><td width="143" valign="top"><![endif]-->
                                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: left;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="133" class="es-m-p20b esd-container-frame" align="center" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-image" style="padding: 0; Margin: 0; font-size: 0px;">
                                                                                                        <a target="_blank" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #333333; font-size: 16px;"><img src="${env.mail_template_image}80801617974647921.png" alt="" style="border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block;" width="45"></a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-text es-p10t es-p10b" style="padding: 0; Margin: 0; padding-top: 10px; padding-bottom: 10px;">
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;">EASY <br>PAYMENT</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                    <td class="es-hidden" width="10" style="padding: 0; Margin: 0;"></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if mso]></td><td width="132" valign="top"><![endif]-->
                                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: left;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="132" align="center" class="esd-container-frame es-m-p20b" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-image" style="padding: 0; Margin: 0; font-size: 0px;">
                                                                                                        <a target="_blank" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #333333; font-size: 16px;"><img src="${env.mail_template_image}77861617974647919.png" alt="" style="border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block;" width="45"></a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-text es-p10t es-p10b" style="padding: 0; Margin: 0; padding-top: 10px; padding-bottom: 10px;">
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;">QUICK <br>RETURN</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if mso]></td><td width="10"></td><td width="132" valign="top"><![endif]-->
                                                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: right;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="132" align="center" class="esd-container-frame" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-image" style="padding: 0; Margin: 0; font-size: 0px;">
                                                                                                        <a target="_blank" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #333333; font-size: 16px;"><img src="${env.mail_template_image}59831617975283573.png" alt="" style="border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block;" width="45"></a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-text es-p10t es-p10b" style="padding: 0; Margin: 0; padding-top: 10px; padding-bottom: 10px;">
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; color: #333333; font-size: 16px;">QUALITY ASSURANCE</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left" bgcolor="#d12421" style="padding: 0; Margin: 0; padding-top: 20px; padding-bottom: 20px; padding-left: 20px; padding-right: 20px; background-color: #d12421;">
                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="560" class="esd-container-frame" align="left" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-social es-p15t es-p15b" style="padding: 0; Margin: 0; padding-top: 15px; padding-bottom: 15px; font-size: 0;">
                                                                                                        <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td align="center" valign="top" class="es-p40r" style="padding: 0; Margin: 0; padding-right: 40px;">
                                                                                                                        <a target="_blank" href="https://www.facebook.com/SomaBlockprints/" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #333333; font-size: 16px;"><img title="Facebook" src="${env.mail_template_image}facebook-logo-white.png" alt="Fb" width="32" style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;"></a>
                                                                                                                    </td>
                                                                                                                    <td align="center" valign="top" class="es-p40r" style="padding: 0; Margin: 0; padding-right: 40px;">
                                                                                                                        <a target="_blank" href="https://twitter.com/somablockprints" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #333333; font-size: 16px;"><img title="Twitter" src="${env.mail_template_image}twitter-logo-white.png" alt="Tw" width="32" style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;"></a>
                                                                                                                    </td>
                                                                                                                    <td align="center" valign="top" class="es-p40r" style="padding: 0; Margin: 0; padding-right: 40px;">
                                                                                                                        <a target="_blank" href="https://www.instagram.com/somablockprints/" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #333333; font-size: 16px;"><img title="Instagram" src="${env.mail_template_image}instagram-logo-white.png" alt="Instagram" width="32" style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;"></a>
                                                                                                                    </td>
                                                                                                                    <td align="center" valign="top" style="padding: 0; Margin: 0;">
                                                                                                                        <a target="_blank" href="https://www.youtube.com/channel/UCbe4E2pO4959tkfHxbe5YTg" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #333333; font-size: 16px;"><img title="Youtube" src="${env.mail_template_image}youtube-logo-white.png" alt="Youtube" width="32" style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;"></a>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-text es-p35b" style="padding: 0; Margin: 0; padding-bottom: 35px;">
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; font-size: 16px; color: #ffffff;">Soma&nbsp;© 2021 Soma Block Prints Pvt. Ltd. All Rights Reserved.</p>
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 150%; font-size: 16px; color: #ffffff;">Soma House, 2-B Girnar Extn.<br>Khatipura, Jaipur 302012,<br>Rajasthan, India</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-divider="1|solid|#ffffff" esd-tmp-menu-color="#ffffff" style="padding: 0; Margin: 0;">
                                                                                                        <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                                            <tbody>
                                                                                                                <tr class="links">
                                                                                                                    <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding: 0; Margin: 0; padding-left: 5px; padding-right: 5px; border: 0; padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="https://www.somashop.com/" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-size: 16px; text-decoration: none; display: block; font-family: 'times new roman', times, baskerville, georgia, serif; color: #ffffff;">Visit Us</a></td>
                                                                                                                    <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding: 0; Margin: 0; padding-left: 5px; padding-right: 5px; border: 0; padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/privacy-policy" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-size: 16px; text-decoration: none; display: block; font-family: 'times new roman', times, baskerville, georgia, serif; color: #ffffff;">Privacy Policy</a></td>
                                                                                                                    <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding: 0; Margin: 0; padding-left: 5px; padding-right: 5px; border: 0; padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/terms-and-conditions" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-size: 16px; text-decoration: none; display: block; font-family: 'times new roman', times, baskerville, georgia, serif; color: #ffffff;">Terms of Use</a></td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; width: 100%; table-layout: fixed;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-stripe" align="center" esd-custom-block-id="388983" style="padding: 0; Margin: 0;">
                                                        <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: transparent;" bgcolor="transparent">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-structure es-p20" align="left" style="Margin: 0; padding: 20px;">
                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="560" class="esd-container-frame" align="center" valign="top" style="padding: 0; Margin: 0;">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-block-text es-infoblock" style="padding: 0; Margin: 0; line-height: 120%; font-size: 16px; color: #cccccc;">
                                                                                                        <p style="Margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'times new roman', times, baskerville, georgia, serif; line-height: 120%; font-size: 16px; color: #cccccc;">
                                                                                                            <a target="_blank" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; font-size: 16px; color: #cccccc;"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; font-size: 16px; color: #cccccc;">Unsubscribe</a>.
                                                                                                            <a target="_blank" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; font-size: 16px; color: #cccccc;"></a>
                                                                                                        </p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </body>
                </html>`,
            })
            console.log('mail sent successfully')
        } catch (error) {
            console.log(error)
            return error
        }   
    }
    
    async sendAbandonMail(email, orderData) {
        try{
            let product_body = ''
            await Promise.all(orderData.order_items.map(async (order_item) => {
                let variation_html_body = ''
                order_item?.product_variations_combination?.product_variations_values?.length > 0 &&
                await Promise.all(order_item?.product_variations_combination?.product_variations_values.map(async (variations) => (
                        variation_html_body +=`${variations.attribute?.name || ''}: ${variations.attribute_value.attribute_value}<br/>`
                    ),
                ))
                product_body += `<tr>
                <td class="esd-structure esdev-adapt-off es-p10t es-p10b es-p20r es-p20l" align="left" esd-custom-block-id="388986">
                    <table width="560" cellpadding="10" cellspacing="0" class="esdev-mso-table">
                        <tbody>
                            <tr>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="padding-left::30px">
                                        <tbody>
                                            <tr>
                                                <td width="70" class="es-m-p0r esd-container-frame" align="center">
                                                    <table cellpadding="0" cellspacing="0" width="100%" style="border-left:2px solid #efefef;border-right:2px solid #efefef;border-top:2px solid #efefef;border-bottom:2px solid #efefef;">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                    <a target="_blank" href="http://143.110.190.232/product?id=${order_item.product.id}"><img class="adapt-img" src="${order_item.product.image}" alt="" style="display: block;" width="66"></a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                        <tbody>
                                            <tr>
                                                <td width="265" class="esd-container-frame" align="center">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333"><strong>${order_item.product.name}</strong><br />${variation_html_body}</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                        <tbody>
                                            <tr>
                                                <td width="80" align="left" class="esd-container-frame">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">${order_item.qty} qty</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                                <td class="esdev-mso-td" valign="top">
                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                        <tbody>
                                            <tr>
                                                <td width="85" align="left" class="esd-container-frame">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="right" class="esd-block-text">
                                                                    <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333">${orderData.currency_symbol}${order_item.qty*order_item.price}</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                </tr>`
            }))
            product_body+=`<tr>
            <td class="esd-structure es-p10t es-p20r es-p20l" align="left">
                <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                        <tr>
                            <td width="560" class="es-m-p0r esd-container-frame" align="center">
                                <table cellpadding="0" cellspacing="0" width="100%" style="border-top: 2px solid #efefef; border-bottom: 2px solid #efefef;padding-right:30px">
                                    <tbody>
                                        <tr>
                                            <td align="right" class="esd-block-text es-m-txt-r es-p10t es-p20b es-p40r">
                                                <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:20px;font-weight: bold;color:#333333">Total:&nbsp;&nbsp;<strong>${orderData.currency_symbol} ${orderData.sub_total}</strong></p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
            </tr>`
            
            try {
                settings.findOne()
                .then(async data => {
                    settingsdata = (data)
                    let response=''
                    let transporte = nodemailer.createTransport({
                        host: data.smtp_host,
                        port: data.smtp_port,
                        auth: {
                            user: data.smtp_username,
                            pass: data.smtp_password,
                        },
                    })

                    transporte.sendMail({
                        from: data.smtp_mail_from_name+'<'+data.smtp_mail_from_address+'>',
                        to: email,
                        subject: "We saved your cart!",
                        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                        <head>
                                <meta charset="UTF-8">
                                <meta content="width=device-width:intial-scale=1.0;maximum-scale=1.0;user-scalable=no;" name="viewport">
                                <meta name="x-apple-disable-message-reformatting">
                                <style>
                                @media screen (max-width:630px){
                                    table{width:100%}
                                    }
                                    </style>
                            </head>
                                <body data-new-gr-c-s-loaded="14.1073.0">
                            <div class="es-wrapper-color" style="background-color: #efefef;">
                                <!--[if gte mso 9]>
                                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                        <v:fill type="tile" color="#efefef"></v:fill>
                                    </v:background>
                                <![endif]-->
                                <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td class="esd-email-paddings" valign="top">
                                                <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-stripe" align="center" esd-custom-block-id="388982">
                                                                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-structure es-p20" align="left" bgcolor="#ffe54a" esd-custom-block-id="717808">
                                                                                <table cellpadding="20" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center">
                                                                                                <table cellpadding="10" cellspacing="0" width="100%">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td align="center" class="esd-block-image es-p10b" style="font-size: 0px;">
                                                                                                                <a target="_blank"><img src="https://jwwryi.stripocdn.email/content/guids/CABINET_224138b5cf3b11ddb673c54b04987c31/images/navlog.png" alt="Logo" style="display: block; font-size: 12px;" width="200" title="Logo" class="adapt-img"></a>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table><table cellpadding="0" cellspacing="0" class="es-content" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-stripe" align="center">
                                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                                <tbody>
                                                                <tr>
                                                                        <td class="esd-structure es-p15t es-p20r es-p20l" align="left">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:30px">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-image es-p10t es-p10b" style="font-size: 0px;margin-top:30px;">
                                                                                                            <img src="http://143.110.190.232/assets/images/99411618298697800.png" width="100">
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p10b es-m-txt-c">
                                                                                                            <h1 style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style: normal;font-weight: bold; color: #333333;margin:0px">We saved your cart!</h1>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l">
                                                                                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color:#333333;margin:0px">Hi, ${orderData.shipping_first_name} Some items in your cart are very popular (you have good taste) but they might be sold out soon. So order today and enjoy your new outfit.</p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-button es-p10t es-p10b"><span class="es-button-border" style="background: #e06666;"><a href="http://143.110.190.232/checkout" class="es-button" target="_blank" style="border-left-width: 30px; border-right-width: 30px; border-radius: 6px;border-style: solid; border-color: #cc0000;   border-width: 10px 30px 10px 30px; display: inline-block;background: #cc0000;border-radius: 5px;font-size: 20px;font-family: 'times new roman', times, baskerville, georgia, serif; font-weight: normal;font-style: normal; line-height: 120%;color: #ffffff;text-decoration: none;width: auto;text-align: center;margin-top: 25px;margin-bottom:25px">PROCEED TO CHECKOUT</a></span></td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                        <tr>
                                                            <td class="esd-structure" align="left">
                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="600" class="esd-container-frame" align="center" valign="top">
                                                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-spacer es-p20t es-p20r es-p20l" style="font-size: 0px;">
                                                                                                <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td style="border-bottom: 2px solid #efefef; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                                ${product_body}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-stripe" align="center" esd-custom-block-id="717807">
                                                            <table class="es-footer-body" align="center" cellpadding="20" cellspacing="0" width="600" style="background-color: transparent;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="esd-structure es-p20" align="left" bgcolor="#ffffff" style="background-color: #ffffff;">
                                                                            <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="143" valign="top"><![endif]-->
                                                                            <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="133" class="es-m-p0r es-m-p20b esd-container-frame" align="center">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                            <a target="_blank"><img src="http://143.110.190.232/assets/images/17971617974647919.png" alt style="display: block;" width="45"></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">FREE <br>SHIPPING</p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                        <td class="es-hidden" width="10"></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <!--[if mso]></td><td width="143" valign="top"><![endif]-->
                                                                            <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="133" class="es-m-p20b esd-container-frame" align="center">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                            <a target="_blank"><img src="http://143.110.190.232/assets/images/80801617974647921.png" alt style="display: block;" width="45"></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">EASY <br>PAYMENT</p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                        <td class="es-hidden" width="10"></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <!--[if mso]></td><td width="132" valign="top"><![endif]-->
                                                                            <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="132" align="center" class="esd-container-frame es-m-p20b">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                            <a target="_blank"><img src="http://143.110.190.232/assets/images/77861617974647919.png" alt style="display: block;" width="45"></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUICK <br>RETURN</p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <!--[if mso]></td><td width="10"></td><td width="132" valign="top"><![endif]-->
                                                                            <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="132" align="center" class="esd-container-frame">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                                                                            <a target="_blank"><img src="http://143.110.190.232/assets/images/59831617975283573.png" alt style="display: block;" width="45"></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;color: #333333;font-size:16px">QUALITY ASSURANCE</p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <!--[if mso]></td></tr></table><![endif]-->
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left" bgcolor="#d12421" style="background-color: #d12421;">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="560" class="esd-container-frame" align="left">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                                                                                            <table cellpadding="5" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td align="center" valign="top" class="es-p40r">
                                                                                                                            <a target="_blank" href="https://www.facebook.com/SomaBlockprints/"><img title="Facebook" src="http://143.110.190.232/assets/images/facebook-logo-white.png" alt="Fb" width="32"></a>
                                                                                                                        </td>
                                                                                                                        <td align="center" valign="top" class="es-p40r">
                                                                                                                            <a target="_blank" href="https://twitter.com/somablockprints"><img title="Twitter" src="http://143.110.190.232/assets/images/twitter-logo-white.png" alt="Tw" width="32"></a>
                                                                                                                        </td>
                                                                                                                        <td align="center" valign="top" class="es-p40r">
                                                                                                                            <a target="_blank" href="https://www.instagram.com/somablockprints/"><img title="Instagram" src="http://143.110.190.232/assets/images/instagram-logo-white.png" alt="Instagram" width="32"></a>
                                                                                                                        </td>
                                                                                                                        <td align="center" valign="top">
                                                                                                                            <a target="_blank" href="https://www.youtube.com/channel/UCbe4E2pO4959tkfHxbe5YTg"><img title="Youtube" src="http://143.110.190.232/assets/images/youtube-logo-white.png" alt="Youtube" width="32"></a>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p35b">
                                                                                                            <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-bottom:0px">Soma&nbsp;© 2021 Soma Block Prints Pvt. Ltd. All Rights Reserved.</p>
                                                                                                            <p style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;margin-top:0px">Soma House, 2-B Girnar Extn.<br>Khatipura, Jaipur 302012,<br>Rajasthan, India</p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td class="esd-block-menu" esd-tmp-menu-padding="5|5" esd-tmp-divider="1|solid|#ffffff" esd-tmp-menu-color="#ffffff">
                                                                                                            <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                                                <tbody>
                                                                                                                    <tr class="links">
                                                                                                                        <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px;"><a target="_blank" href="https://www.somashop.com/" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Visit Us</a></td>
                                                                                                                        <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/privacy-policy" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Privacy Policy</a></td>
                                                                                                                        <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #ffffff;"><a target="_blank" href="https://somashop.com/terms-and-conditions" style="color: #ffffff;font-family: 'times new roman', times, baskerville, georgia, serif;text-decoration:none;font-size:16px">Terms of Use</a></td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-stripe" align="center" esd-custom-block-id="388983">
                                                            <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="esd-structure es-p20" align="left">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-infoblock">
                                                                                                            <p style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">
                                                                                                                No longer want to receive these emails?&nbsp;<a href target="_blank" style="font-family: 'times new roman', times, baskerville, georgia, serif;font-size:16px;color: #cccccc;">Unsubscribe</a>.
                                                                                                            </p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </body>

                        </html>`
                    })
                })
            } catch (error) {
            }
            console.log('mail sent successfully')
        } catch (error) {
            console.log(error)
            return error
        }
    }
}
module.exports=MailService;
