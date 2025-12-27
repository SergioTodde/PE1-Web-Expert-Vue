import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/events',
        name: 'Events',
        component: () => import('../views/Events.vue')
    },
    {
        path: '/events/:id',
        name: 'EventDetail',
        component: () => import('../views/EventDetailView.vue'),
        props: true
    },
    {
        path: '/create-event',
        name: 'CreateEvent',
        component: () => import('../views/CreateEvent.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/Admin.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/password-reset',
        name: 'PasswordReset',
        component: () => import('../views/PasswordReset.vue')
    },
    {
        path: '/help',
        name: 'Help',
        component: () => import('../views/viewsFooter/Help.vue')
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/viewsFooter/Contact.vue')
    },
    {
        path: '/faq',
        name: 'FAQ',
        component: () => import('../views/viewsFooter/FAQ.vue')
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: () => import('../views/viewsFooter/Privacy.vue')
    },
    {
        path: '/terms',
        name: 'Terms',
        component: () => import('../views/viewsFooter/Terms.vue')
    },
    {
        path: '/cookies',
        name: 'Cookies',
        component: () => import('../views/viewsFooter/Cookies.vue')
    },
    {
        path: '/pricing',
        name: 'Pricing',
        component: () => import('../views/viewsFooter/Pricing.vue')
    },
    {
        path: '/success-stories',
        name: 'SuccessStories',
        component: () => import('../views/viewsFooter/SuccessStories.vue')
    },
    {
        path: '/resources',
        name: 'Resources',
        component: () => import('../views/viewsFooter/Resources.vue')
    },
    {
        path: '/api',
        name: 'API',
        component: () => import('../views/viewsFooter/API.vue')
    },
    {
        path: '/partners',
        name: 'Partners',
        component: () => import('../views/viewsFooter/Partners.vue')
    },
    {
        path: '/sitemap',
        name: 'Sitemap',
        component: () => import('../views/viewsFooter/Sitemap.vue')
    },
    {
        path: '/accessibility',
        name: 'Accessibility',
        component: () => import('../views/viewsFooter/Accessibility.vue')
    },
    {
        path: '/security',
        name: 'Security',
        component: () => import('../views/viewsFooter/Security.vue')
    },
    {
        path: '/notifications',
        name: 'Notifications',
        component: () => import('../views/notifications.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['auth/isAuthenticated']
    const isAdmin = store.getters['auth/isAdmin']

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    } else if (to.meta.requiresAdmin && !isAdmin) {
        next('/')
    } else {
        next()
    }
})

export default router