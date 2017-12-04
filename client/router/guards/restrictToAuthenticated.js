import Debug from 'debug'
import axios from 'axios'
import VueCookie from 'vue-cookie'

const debug = Debug('nova-fass:router:restrictToAuthenticated')

export default async function (to, from, next) {
  debug('control has just start')
  try {
    const response = await axios('http://api.nova.local.net/auth/control', { headers: { authorization: VueCookie.get('rememberMe') } }).catch(error => {
      throw error
    })
    to.meta.credentials = response.data.credentials
    next()
  } catch (error) {
    if (error.response && error.response.status === 401) return next('/login')
    next(error)
  }
}
