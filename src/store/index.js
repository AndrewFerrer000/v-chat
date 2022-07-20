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
        userChatInfo: [],
    },
    mutations: {
        SET_USERLIST(state, payload) {
            state.userList = payload;
        },
        SET_MESSAGES(state, payload) {
            state.messages = payload;
        },
        SET_USER_CHAT_INFO(state, payload) {
            state.userChatInfo = payload;
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
            const unsubscribe = onSnapshot(q, (data) => {
                let temp = [];
                if (!data.empty) {
                    const finalList = async () => {
                        for (const document of data.docs) {
                            const getName = async () => {
                                for (const member of document.data().members) {
                                    if (member != auth.currentUser.uid) {
                                        const docRef = doc(db, "users", member);
                                        const docSnap = await getDoc(docRef);
                                        return docSnap.data();
                                    }
                                }
                            };
                            const sample = await getName();
                            temp.push({
                                createdAt:
                                    document.data().recent_message.createdAt,
                                text: document.data().recent_message.text,
                                chatLink: document.id,
                                display_name: sample.display_name,
                            });
                            list = temp;
                        }
                        return list;
                    };
                    finalList().then((result) => {
                        context.commit("SET_USERLIST", result);
                    });
                }
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
