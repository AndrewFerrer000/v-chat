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
                collection(db, `message/${auth.currentUser.uid}/messages`),
                orderBy("recent_message.createdAt", "desc")
            );
            onSnapshot(q, (data) => {
                let temp = [];
                const finalList = async () => {
                    for (const document of data.docs) {
                        let getUserRef = await getDoc(document.data().userRef);
                        temp.push({
                            createdAt: document.data().recent_message.createdAt,
                            text: document.data().recent_message.text,
                            chatLink: document.id,
                            display_name: getUserRef.data().display_name,
                            photoURL: getUserRef.data().photoURL,
                        });
                        list = temp;
                    }
                    return list;
                };
                finalList().then((res) => {
                    context.commit("SET_USERLIST", res);
                });
            });
        },

        async getMessages(context, payload) {
            const q = query(
                collection(
                    db,
                    `message/${auth.currentUser.uid}/messages/${payload}/actual_message`
                ),
                orderBy("createdAt", "asc")
            );
            onSnapshot(q, (data) => {
                let getMessage = [];
                data.forEach((document) => {
                    getMessage.push(document.data());
                });
                context.commit("SET_MESSAGES", getMessage);
            });
        },
    },
    modules: {},
});
