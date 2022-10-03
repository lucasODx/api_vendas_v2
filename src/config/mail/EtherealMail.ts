import nodeMailer from 'nodemailer';
import HandleBarsMailTemplate from './HandlebarsMailTemplate';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {

  static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
    const account = await nodeMailer.createTestAccount();
    const mailTemplate = new HandleBarsMailTemplate();
    const transporter = nodeMailer.createTransport(
      {
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      }
    );
    const message = await transporter.sendMail(
      {
        from: {
          name: from?.name || 'Equipe api vendas',
          address: from?.email || 'equipeapivendas@email.com'
        },
        to: {
          name: to.name,
          address: to.email
        },
        subject,
        html: await mailTemplate.toParse(templateData)
      }
    );

    console.log('Message sent: %s', message.messageId);
    console.log('Preview url: %s', nodeMailer.getTestMessageUrl(message));
  }

}
