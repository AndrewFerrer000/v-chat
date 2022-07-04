import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Message from "../views/Message.vue";
import ErrorPage from "../views/ErrorPage.vue";
import Authentication from "../views/auth/Authentication.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import { auth } from "@/main";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        beforeEnter: (to, from, next) => {
            if (!auth.currentUser) next({ name: "authentication" });
            else next();
        },
        redirect: "/message",
        meta: { requiresAuth: true },
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
        beforeEnter: (to, from, next) => {
            if (auth.currentUser) next({ name: "home" });
            else next();
        },
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
    {
        name: "error-page",
        path: "/error-page",
        component: ErrorPage,
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: { name: "error-page" },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
