import { createStore } from 'vuex'
import auth from './modules/auth'
import events from './modules/events'
import tickets from './modules/tickets'
import users from './modules/users'

export default createStore({
    modules: {
        auth,
        events,
        tickets,
        users
    }
})