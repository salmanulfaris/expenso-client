import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AccountIndex from '@/views/Accounts/AccountIndex.vue'
import JvCreate from '@/views/JV/JvCreate.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import JvIndex from "@/views/JV/JvIndex";
import TrialBalance from "@/views/Accounts/TrialBalance";
import AccountStatement from "@/views/Accounts/AccountStatement";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/accounts',
        name: 'accounts',
        component: AccountIndex
    },

    {
        path: '/create-jv',
        name: 'create-jv',
        component: JvCreate
    },

    {
        path: '/index-jv',
        name: 'index-jv',
        component: JvIndex
    },
    {
        path: '/index-tb',
        name: 'index-tb',
        component: TrialBalance
    },

    {
        path: '/account-statement',
        name: 'account-statement',
        component: AccountStatement
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
