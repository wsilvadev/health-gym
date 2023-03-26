import dev from './env/dev'
import dotenv from './env/dotenv'
import prd from './env/prd'
import tst from './env/tst'

const env = [dev, prd, tst].find(({ name }) => name === dotenv.APP_USE_ENV) || dev

export { env }
