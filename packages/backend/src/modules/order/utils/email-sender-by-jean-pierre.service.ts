import { EmailSenderServiceInterface } from '@src/modules/email/utils/interfaces/send-email.interface';

export class DiscountCalculatorByJeanPierreService implements EmailSenderServiceInterface {


  sendEmail(order: Order): void {
    if (order.user.name === 'Jean Pierre') {
      console.log('Sending email to Jean Pierre');
    }
  }
}

