import * as fs from 'fs'

import * as handlebars from 'handlebars'
import * as nodemailer from 'nodemailer'

import { IMailProvider } from '../i-mail-provider'

export class EtherealMailProvider implements IMailProvider {
  private client: nodemailer.Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        })

        this.client = transporter
      })
      .catch(error => console.error(error))
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')

    const templateParse = handlebars.compile(templateFileContent)

    const html = templateParse(variables)

    const message = await this.client.sendMail({
      to,
      from: 'ProjectName <no-reply@bordignon.dev>',
      subject,
      html,
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
