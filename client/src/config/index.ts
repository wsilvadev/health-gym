import { USE_ENV } from 'env'

import dev from './env/dev'
import prd from './env/prd'
import tst from './env/tst'

const env = [dev, prd, tst].find(({ name }) => name === USE_ENV) || dev

export { env }
