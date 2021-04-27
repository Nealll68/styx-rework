import axios from 'axios'

axios.defaults.xsrfCookieName = 'xsrf-token'

export default axios