import { createStore } from "vuex";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
    doc,
    getDocs,
    getDoc,
} from "firebase/firestore";
import { auth, db } from "@/main";

export default createStore({
    state: {
        userList: [],
        messages: [],
    },
    mutations: {
        SET_USERLIST(state, payload) {
            state.userList = payload;
        },
        SET_MESSAGES(state, payload) {
            state.messages = payload;
        },
    },
    actions: {
        async getUserlist(context) {
            let list = [];
            const q = query(
                collection(db, "channel"),
                where("members", "array-contains", `${auth.currentUser.uid}`),
                orderBy("recent_message.createdAt", "desc")
            );
            onSnapshot(q, (data) => {
                data.forEach((document) => {
                    list.push({
                        createdAt: document.data().recent_message.createdAt,
                        text: document.data().recent_message.text,
                        chatLink: document.id,
                        display_name: document.data().recent_message.from,
                    });
                });
                context.commit("SET_USERLIST", list);
            });
        },

        async getMessages(context, payload) {
            const q = query(
                collection(db, `channel/${payload}/messages`),
                orderBy("createdAt", "asc")
            );
            onSnapshot(q, (data) => {
                let temp = [];
                data.forEach((document) => {
                    temp.push(document.data());
                });
                context.commit("SET_MESSAGES", temp);
            });
        },
    },
    modules: {},
});

// import Vuex from "vuex";

// //init store
// const store = new Vuex.Store({
//     state: {
//         userlist: [],
//         firstUserLink: "",
//     },
//     mutations: {
//         async getFirstUserLink(state, value) {
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

// export default store;
