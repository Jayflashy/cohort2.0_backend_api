// const formData = require('form-data');
// const Mailgun = require('mailgun.js');
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
//     username: 'api', 
//     key: AppConfig.MAILGUN_API_KEY,
//     url: "https://api.mailgun.net",
// });


  
// module.exports = class MailService {

//     //email account verification
//     static async sendVerificationMail(content) {
//        await mg.messages.create('boltcliq.com', {
//             from: "MedBookly <noreply@boltcliq.com>",
//             to: content.to,
//             subject: "Verify Your Email",
//             template: "medbookly_signup",
//             "h:X-Mailgun-Variables": JSON.stringify({ 
//                 verificationLink: content.verificationLink,
//               } || ""),
//             'h:Reply-To': 'office@boltcliq.com',
//           })
//           .then(msg => console.log(msg)) // logs response data
//           .catch(err => console.error(err)); // logs any error
//     }

// }



//The code below is the dummy mail sender
//Delete the dummy codes and umcomment the above codes to
//make the actual Mail service active


//return account verification email data
async function verificationMailer (data) {
  return {
    to : data.to,
    from: "mailler@site.org",
    subject: "Verify email",
    verificationLink: data.verificationLink
    }
}

//return account password reset email data
async function passwordResetMailer (data) {
  return {
    to : data.to,
    from: "mailler@site.org",
    subject: "Reset Password",
    passwordResetLink: data.passwordResetLink
    }
}
module.exports =  class MailService {
  
  static async sendVerificationMail(content) {
    await verificationMailer(content)
      .then(msg => {
        console.log(msg)
      })
      .catch(err => console.log(err))
  }
  static async sendPasswordResetMail(content) {
    await passwordResetMailer(content)
      .then(msg => {
        console.log(msg)
      })
      .catch(err => console.log(err))
  }
}

