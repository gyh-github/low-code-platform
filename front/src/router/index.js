import { createWebHashHistory, createRouter } from 'vue-router';
import { getToken } from '@/utils/sessionStor';
const routes = [
    {
        path: '/',
        component: () => import('@/views/layout'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/layout/components/home')
            },
            {
                path: '/workbenches',
                component: () => import('@/views/layout/components/workbenches')
            },
            {
                path: '/personalCenter',
                component: () => import('@/views/layout/components/personalCenter')
            },
            {
                path: '/about',
                component: () => import('@/views/layout/components/about')
            },
            {
                path: '/join',
                component: () => import('@/views/layout/components/join')
            },
            {
                path: '/materials',
                component: () => import('@/views/layout/components/materials')
            }
        ]
    },
    {
        path: '/container',
        component: () => import('@/packages/container.jsx')
    },
    {
        path: '/login',
        component: () => import('@/views/login')
    },
    {
        path: '/preview',
        component: () => import('@/views/preview/index.jsx')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const memberNav = ['/container', '/personalCenter','/workbenches'];
router.beforeEach((to, from, next) => {
    const _token = getToken();
    if (memberNav.includes(to.path) && !_token) {
        next({
            path: '/login',
            query: {
                redirectUrl:to.path
            }
        })
    } else {
        next();
    }
})

export default router;
