import { DotEnv } from "./type"

export default {
  APP_DEV_API: import.meta.env.APP_DEV_API,
  APP_PRD_API: import.meta.env.APP_PRD_API,
  APP_TST_API: import.meta.env.APP_TST_API,
  APP_USE_ENV: import.meta.env.APP_USE_ENV
} as DotEnv
