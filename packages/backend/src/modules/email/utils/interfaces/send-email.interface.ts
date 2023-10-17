export interface EmailSenderServiceInterface {
  sendEmail(receivers:string[],subject: string, content: string): void;
}
