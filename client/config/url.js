import env from './env'

const DEV_URL = 'http://127.0.0.1:7001'
const PRO_URL = 'https://produce.com'

export default env === 'development' ? DEV_URL : PRO_URL
