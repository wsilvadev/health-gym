declare module 'env' {
  export const DEV_API_URL: string
  export const TST_API_URL: string
  export const PRD_API_URL: string
  export const USE_ENV: 'dev' | 'tst' | 'prd'
}
