import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue'; // 기본 홈 컴포넌트
import KakaoLogin from '@/components/KakaoLogin.vue'; // KakaoLogin 컴포넌트

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/kakaologin',
        name: 'KakaoLogin',
        component: KakaoLogin,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
