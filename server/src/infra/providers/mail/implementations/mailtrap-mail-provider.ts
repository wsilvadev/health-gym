import * as fs from 'fs'

import * as handlebars from 'handlebars'
import * as nodemailer from 'nodemailer'

import { IMailProvider } from '../i-mail-provider'

import { mailtrapCredentials } from 'src/config/mail'

export class MailtrapMailProvider implements IMailProvider {
  private client: nodemailer.Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: mailtrapCredentials(),
    })
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

    await this.client.sendMail({
      to,
      from: 'ProjectName <no-reply@bordignon.dev>',
      subject,
      html,
    })
  }
}
