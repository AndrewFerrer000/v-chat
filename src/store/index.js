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
                collection(db, `channels`),
                where("members", "array-contains", auth.currentUser.uid),
                orderBy("recent_message.createdAt", "desc")
            );

            onSnapshot(q, (data) => {
                let temp = [];

                const finalList = async () => {
                    for (const document of data.docs) {
                        let getUserDetails = {};
                        for (const member of document.data().members) {
                            if (member != auth.currentUser.uid) {
                                let userRef = doc(db, "users", member);
                                let getUserRef = await getDoc(userRef);
                                getUserDetails = getUserRef.data();
                            }
                        }
                        temp.push({
                            createdAt: document.data().recent_message.createdAt,
                            text: document.data().recent_message.text,
                            chatLink: document.id,
                            display_name: getUserDetails.display_name,
                            photoURL: getUserDetails.photoURL,
                        });
                        list = temp;
                    }
                    return list;
                };
                finalList().then((result) => {
                    context.commit("SET_USERLIST", result);
                });
            });
            // let list = [];
            // const q = query(
            //     collection(db, `message/${auth.currentUser.uid}/messages`),
            //     orderBy("recent_message.createdAt", "desc")
            // );
            // onSnapshot(q, (data) => {
            //     let temp = [];
            //     const finalList = async () => {
            //         for (const document of data.docs) {
            //             let getUserRef = await getDoc(document.data().userRef);
            //             temp.push({
            //                 createdAt: document.data().recent_message.createdAt,
            //                 text: document.data().recent_message.text,
            //                 chatLink: document.id,
            //                 display_name: getUserRef.data().display_name,
            //                 photoURL: getUserRef.data().photoURL,
            //             });
            //             list = temp;
            //         }
            //         return list;
            //     };
            //     finalList().then((res) => {
            //         context.commit("SET_USERLIST", res);
            //     });
            // });
        },

        async getMessages(context, payload) {
            const q = query(
                collection(db, `msg/${payload}/messages`),
                orderBy("createdAt", "asc")
            );
            onSnapshot(q, (data) => {
                const getMessage = [];
                data.forEach((document) => {
                    getMessage.push({ ...document.data(), id: document.id });
                });
                context.commit("SET_MESSAGES", getMessage);
            });
        },
    },
    modules: {},
});
