import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Message from "../views/Message.vue";
import Login from "../views/auth/Login.vue";

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
        path: "/login",
        name: "login",
        component: Login,
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
