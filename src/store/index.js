import { createStore } from "vuex";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/main";

export default createStore({
    state: {
        userlist: [],
    },
    mutations: {
        async userlist(state) {
            const q = query(
                collection(db, "user_chat"),
                orderBy("modifiedAt", "desc")
            );
            onSnapshot(q, (data) => {
                state.userlist = [];
                data.forEach((document) => {
                    state.userlist.push(document.data());
                });
            });
        },
    },
    actions: {
        GET_USERLIST(context) {
            context.commit("userlist");
        },
    },
    modules: {},
});
