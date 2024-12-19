import { createWebHashHistory, createRouter } from 'vue-router'
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
                path: '/find',
                component: () => import('@/views/layout/components/find')
            },
            {
                path: '/about',
                component: () => import('@/views/layout/components/about')
            },
            {
                path: '/join',
                component: () => import('@/views/layout/components/join')
            }
        ]
    },
    {
        path: '/container',
        component: () => import('@/packages/container.jsx')
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

export default router;
