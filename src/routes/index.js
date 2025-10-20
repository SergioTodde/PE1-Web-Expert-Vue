import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import PrivacyPolicyView from "../views/PrivacyPolicyView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import SignInComponent from "../components/SignInComponent.vue";
import LogInComponent from "../components/LogInComponent.vue";
import PasswordForgottenComponent from "../components/PasswordForgottenComponent.vue";
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
            path: '/over',
            component: AboutView,
        },
        {
            name: 'Sign-in',
            path: '/aanmelden',
            component: SignInComponent,
        },
        {
            name: 'Login',
            path: '/login',
            component: LogInComponent,
        },
        {
            name: 'Password forgotten',
            path: '/wachtwoord-vergeten',
            component: PasswordForgottenComponent,
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