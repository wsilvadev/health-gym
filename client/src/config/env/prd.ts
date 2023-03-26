import dotenv from './dotenv'

export default {
  apiUrl: dotenv.APP_PRD_API,
  debugMode: true,
  name: 'prd',
  useMocks: false,
}
