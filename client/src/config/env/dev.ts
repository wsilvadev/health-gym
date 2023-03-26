import dotenv from './dotenv'

export default {
  apiUrl: dotenv.APP_DEV_API,
  debugMode: true,
  name: 'dev',
  useMocks: false,
}
