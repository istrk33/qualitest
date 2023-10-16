import Mailto from 'mailer';

export default class EmailSender {
    async sendEmail(receivers:string[],subject: string, content: string) {
        receivers.forEach(receiver=>{
            await MailTo.send(receiver,subject,content);
        })
    }
}