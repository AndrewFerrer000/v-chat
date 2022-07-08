// import { createStore } from "vuex";

// export default createStore({
//     state: {
//         userlist: [],
//         firstUserLink: "",
//     },
//     mutations: {
//         getFirstUserLink(state, value) {
//             return (state.firstUserLink = value);
//         },
//     },
//     actions: {
//         GET_USERLIST(context) {
//             context.commit("userlist");
//         },
//     },
//     modules: {},
// });

import Vuex from "vuex";

//init store
const store = new Vuex.Store({
    state: {
        userlist: [],
        firstUserLink: "",
    },
    mutations: {
        async getFirstUserLink(state, value) {
            return (state.firstUserLink = value);
        },
    },
    actions: {
        GET_USERLIST(context) {
            context.commit("userlist");
        },
    },
    modules: {},
});

export default store;
