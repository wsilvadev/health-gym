const isProd = process.env.NODE_ENV === 'production'

type MailProviderType = 'ethereal' | 'mailtrap' | 'ses'

type Type = {
  mailProvider: MailProviderType
}

export const mailtrapCredentials = () => ({
  user: process.env.MAILTRAP_USER,
  pass: process.env.MAILTRAP_PASS,
})

const sesCredentials = {}

export const mailProviderConfig: Type = {
  mailProvider: process.env.MAIL_PROVIDER || isProd ? 'ses' : 'mailtrap',
}
