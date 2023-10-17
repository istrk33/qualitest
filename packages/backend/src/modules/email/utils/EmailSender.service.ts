import {Mailto} from "MailerSender";
import {EmailSenderServiceInterface} from "./interfaces/send-email.interface";
// export default class EmailSender implements EmailSenderServiceInterface  {
//     async sendEmail(receivers:string[],subject: string, content: string) {
//         receivers.forEach(receiver=>{
//             await MailTo.send(receiver,subject,content);
//         })
//     }
// }

export default class EmailSenderService implements EmailSenderServiceInterface{
    async sendEmail(emailsTo: string[],emailContent: string, emailSubject: string): Promise<void> {
      emailsTo.map(async (emailTo) => {
        const email = new EmailTemplate(emailContent, emailSubject, emailTo);
  
        await email.sendEmail();
      });
    }
  }
  