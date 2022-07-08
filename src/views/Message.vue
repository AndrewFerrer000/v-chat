<template>
    <div class="relative w-full flex flex-col" v-if="$route.params.id != ' '">
        <!-- Message Header -->
        <div
            id="backgroundImg"
            class="absolute top-0 left-0 w-full h-full -z-10 bg-gray-100 bg-contain bg-no-repeat bg-center blur-sm"
        ></div>
        <div
            class="w-full h-16 flex items-center justify-between bg-white border-b border-gray-300 shadow-md px-5"
        >
            <div class="flex items-center gap-2">
                <img
                    src="https://picsum.photos/200/300"
                    class="rounded-full w-10 h-10"
                />
                <div>
                    <p>{{ userInfo.display_name }}</p>
                    <p class="text-xs text-green-500">Active</p>
                </div>
            </div>
            <span class="flex gap-3 text-2xl text-gray-500">
                <i class="bx bx-search"></i>
                <i class="bx bx-star"></i>
                <i class="bx bx-bell"></i>
            </span>
        </div>

        <!-- Body -->
        <div class="h-4/5 p-5 flex flex-col gap-5 overflow-y-auto">
            <!-- Actual message -->
            <div
                class="w-full items-start flex gap-2"
                v-for="message in messages"
                :key="message"
                :class="{ 'justify-end': message.from == currentUser }"
            >
                <img
                    src="https://picsum.photos/200/300"
                    :class="{
                        'order-2': message.from == currentUser,
                    }"
                    class="rounded-full w-10 h-10 shadow-md border border-gray-300"
                />
                <div>
                    <p
                        class="rounded-lg bg-white py-2 px-4 max-w-xs sm:max-w-sm md:max-w-md shadow-md"
                        :class="{
                            'bg-green-500 text-white order-1':
                                message.from == currentUser,
                        }"
                    >
                        {{ message.text }}
                    </p>
                    <p
                        class="text-xs text-gray-500 mt-1 ml-2"
                        :class="{
                            'mr-2 text-right': message.from == currentUser,
                        }"
                    >
                        {{ message.createdAt.seconds }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Actions -->
        <div class="bg-white border-t border-gray-300 px-5 mt-auto">
            <form
                class="w-full h-16 flex items-center justify-between gap-5"
                @submit.prevent="submitMessage"
            >
                <input
                    class="w-full bg-gray-100 py-2 px-4 rounded-lg outline-none"
                    type="text"
                    placeholder="Message"
                    v-model="message"
                />
                <button type="submit">
                    <i
                        class="bx bx-send text-3xl text-green-500 transform -rotate-45"
                    ></i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    setDoc,
    getDoc,
    getDocs,
    doc,
    Timestamp,
} from "firebase/firestore";
import { db, auth } from "@/main";
export default {
    data() {
        return {
            currentUser: "",
            userInfo: {},
            messages: [],
            message: "",
        };
    },
    mounted() {
        this.getMessage();
        this.getUserInfo();
        this.currentUser = auth.currentUser.uid;
    },
    watch: {
        $route(to, from) {
            this.getUserInfo();
            this.getMessage();
            this.message = "";
        },
    },
    methods: {
        async getUserInfo() {
            const getChatUserId = this.$route.params.id;

            onSnapshot(doc(db, "users", `${getChatUserId}`), (doc) => {
                this.userInfo = doc.data();
            });
        },
        async getMessage() {
            const getChatUserId = this.$route.params.id;
            const getCurrentUserID = auth.currentUser.uid;
            const q = query(
                collection(
                    db,
                    `/message/${getCurrentUserID}/messages/${getChatUserId}/actual_message`
                ),
                orderBy("createdAt", "asc")
            );
            onSnapshot(q, (data) => {
                let sampleData = [];
                data.forEach((document) => {
                    sampleData.push(document.data());
                });
                this.messages = sampleData;
            });
        },

        async submitMessage() {
            const getChatUserId = this.$route.params.id;
            const getCurrentUserID = auth.currentUser.uid;
            const colRef = collection(
                db,
                `/message/${getCurrentUserID}/messages/${getChatUserId}/actual_message`
            );
            await setDoc(doc(colRef), {
                createdAt: Timestamp.now(),
                text: this.message,
                to: getChatUserId,
                from: getCurrentUserID,
            })
                .then(() => {
                    this.message = "";
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="postcss" scoped>
#backgroundImg {
    background-image: url("../assets/Pngtree.png");
}
</style>
