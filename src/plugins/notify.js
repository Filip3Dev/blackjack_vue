import Notifications from 'vue-notification'
import velocity from 'velocity-animate'

export default ({ Vue }) => {
  Vue.use(Notifications, { velocity })
}
