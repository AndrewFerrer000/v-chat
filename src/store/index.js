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
    DocumentSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "@/main";

export default createStore({
    state: {
        userList: [],
    },
    mutations: {
        GET_USERLIST(state, payload) {
            state.userList = payload;
            console.log("MUTATION");
        },
    },
    actions: {
        async getUserlist(context) {
            console.log("ACTION");
            let sample = [];
            const q = query(
                doc(db, "channel"),
                where("members", "array-contains", `${auth.currentUser.uid}`),
                orderBy("recent_message.createdAt", "desc")
            );
            onSnapshot(q, (data) => {
                let temp = [];
                data.forEach((document) => {
                    temp.push({
                        createdAt: document.data().recent_message.createdAt,
                        text: document.data().recent_message.text,
                        chatLink: document.id,
                        display_name: document.data().recent_message.from,
                    });
                });
                sample = temp;
            });
            context.commit("GET_USERLIST", sample);
            console.log(context.state.userList);
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
