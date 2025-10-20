import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import PrivacyPolicyView from "../views/PrivacyPolicyView.vue";
import NotFoundView from "../views/NotFoundView.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            name: 'Home',
            path: '/',
            component: HomeView,
        },
        {
            name: 'About',
            path: '/about',
            component: AboutView,
        },
        {
            name: 'PrivacyPolicy',
            path: '/privacy-richtlijnen',
            component: PrivacyPolicyView,
        },
        {
            path: '/:notFound(.*)',
            name: 'NotFound',
            component: NotFoundView,
        }
    ],
});

export default router