export type DotEnv = {
  APP_DEV_API: string
  APP_PRD_API: string,
  APP_TST_API: string,
  APP_USE_ENV: 'dev' | 'tst' | 'prd'
}