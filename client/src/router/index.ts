import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';

import WaxInView from '../views/WaxInView.vue';
import WaxInItemView from '../views/WaxInItemView.vue';
import WaxInCreateEditView from '../views/WaxInCreateEditView.vue';

import WaxOutView from '../views/WaxOutView.vue';
import WaxOutItemView from '../views/WaxOutItemView.vue';
import WaxOutCreateEditView from '../views/WaxOutCreateEditView.vue';

import ThirdPartiesView from '../views/ThirdPartiesView.vue';
import ThirdPartiesItemView from '../views/ThirdPartiesItemView.vue';
import ThirdPartiesCreateView from '../views/ThirdPartiesCreateView.vue';

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
            component: WaxInCreateEditView,
        },
        {
            path: '/w/in/:id',
            name: 'WaxInItemView',
            component: WaxInItemView,
        },
        {
            path: '/w/in/:id/edit',
            name: 'WaxInEditView',
            component: WaxInCreateEditView,
        },
        {
            path: '/w/out',
            name: 'WaxOutView',
            component: WaxOutView,
        },
        {
            path: '/w/out/new',
            name: 'WaxOutCreateView',
            component: WaxOutCreateEditView,
        },
        {
            path: '/w/out/:id',
            name: 'WaxOutItemView',
            component: WaxOutItemView,
        },
        {
            path: '/w/out/:id/edit',
            name: 'WaxOutEditView',
            component: WaxOutCreateEditView,
        },
        {
            path: '/t',
            name: 'ThirdPartiesView',
            component: ThirdPartiesView,
        },
        {
            path: '/t/new',
            name: 'ThirdPartiesCreateView',
            component: ThirdPartiesCreateView,
        },
        {
            path: '/t/:id',
            name: 'ThirdPartiesItemView',
            component: ThirdPartiesItemView,
        },
        {
            path: '/t/:id/edit',
            name: 'ThirdPartiesEditView',
            component: ThirdPartiesCreateView,
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
