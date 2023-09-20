import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
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