import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Message from "../views/Message.vue";
import Authentication from "../views/auth/Authentication.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import { auth } from "@/main";
import { onAuthStateChanged } from "firebase/auth";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        beforeEnter: (to, from, next) => {
            onAuthStateChanged(auth, (user) => {
                if (!user) next({ name: "authentication" });
                else next();
            });
        },
        redirect: "/message",
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
            onAuthStateChanged(auth, (user) => {
                if (user) next({ name: "home" });
                else next();
            });
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
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
