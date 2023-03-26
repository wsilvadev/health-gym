import dotenv from './dotenv'

export default {
  apiUrl: dotenv.APP_TST_API,
  debugMode: true,
  name: 'tst',
  useMocks: false,
}
