import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import WaxInView from '../views/WaxInView.vue';
import WaxInCreateView from '../views/WaxInCreateView.vue';
import WaxInItemView from '../views/WaxInItemView.vue';
import WaxOutView from '../views/WaxOutView.vue';
import { useAuthentication } from '@/stores/authentication';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/w/in',
            name: 'WaxInView',
            component: WaxInView,
        },
        {
            path: '/w/in/new',
            name: 'WaxInCreateView',
            component: WaxInCreateView,
        },
        {
            path: '/w/in/:id',
            name: 'WaxInItemView',
            component: WaxInItemView,
        },
        {
            path: '/w/out',
            name: 'WaxOutView',
            component: WaxOutView,
        },
    ],
});

router.beforeEach((to, from, next) => {
    const authentication = useAuthentication();

    if (to.name !== 'login' && !authentication.isConnected) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
