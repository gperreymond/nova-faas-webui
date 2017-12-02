import Debug from 'debug'
const debug = Debug('nova-fass:router:restrictToAuthenticated')

export default async function (to, from, next) {
  debug('control has just start')
  next()
}
