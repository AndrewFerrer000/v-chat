import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Message from "../views/Message.vue";
import Authentication from "../views/auth/Authentication.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        children: [
            {
                path: "/message",
                name: "message",
                component: Message,
            },
        ],
    },
    {
        path: "/auth",
        name: "authentication",
        component: Authentication,
        redirect: "/auth/login",
        children: [
            {
                path: "/auth/login",
                name: "login",
                component: Login,
            },
            {
                path: "/auth/register",
                name: "register",
                component: Register,
            },
        ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
