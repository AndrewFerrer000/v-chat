<template>
    <div
        class="relative w-full flex flex-col overflow-hidden"
        v-if="$route.params.id != ' '"
    >
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
                    v-if="userInfo.photoURL"
                    :src="userInfo.photoURL"
                    class="rounded-full w-10 h-10"
                />
                <div
                    v-else
                    class="w-10 h-10 relative flex justify-center items-center rounded-full text-lg text-white uppercase border"
                >
                    <span
                        class="w-full h-full rounded-full grid place-items-center overflow-hidden"
                        :class="[`bg-green-400`]"
                        >VC</span
                    >
                </div>
                <div>
                    <p class="capitalize">{{ userInfo.display_name }}</p>
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
        <div
            class="h-4/5 p-5 flex flex-col gap-5 overflow-y-auto"
            ref="messageContainer"
        >
            <!-- Actual message -->
            <div
                class="w-full items-start flex gap-2"
                v-for="(message, index) in messages"
                :key="index"
                :class="{ 'justify-end': message.from == currentUser }"
            >
                <img
                    v-if="userInfo.photoURL"
                    :src="userInfo.photoURL"
                    :class="{
                        'order-2': message.from == currentUser,
                    }"
                    class="rounded-full w-10 h-10 shadow-md border border-gray-300"
                />
                <img
                    v-else
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
    <div
        class="relative w-full h-full grid place-items-center bg-gray-100"
        v-else
    >
        Created New
    </div>
</template>

<script>
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    setDoc,
    getDoc,
    getDocs,
    doc,
    Timestamp,
    updateDoc,
    documentId,
} from "firebase/firestore";
import { db, auth } from "@/main";
import { onMounted, watch, ref, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    setup() {
        const store = useStore();
        const route = useRoute();
        const messages = ref([]);
        const message = ref("");
        const userInfo = ref({});
        const currentUser = auth.currentUser.uid;

        onMounted(async () => {
            getMessages();
            getChatInfo();
        });

        const getMessages = () => {
            const q = query(
                collection(
                    db,
                    `message/${auth.currentUser.uid}/messages/${route.params.id}/actual_message`
                ),
                orderBy("createdAt", "asc")
            );
            onSnapshot(q, (data) => {
                let getMessage = [];
                data.forEach((document) => {
                    getMessage.push(document.data());
                    messages.value = [];
                });
                messages.value = getMessage;
            });
        };

        const getChatInfo = async () => {
            const colRef = collection(db, `users`);
            const q = doc(colRef, `${route.params.id}`);

            onSnapshot(q, (document) => {
                userInfo.value = document.data();
            });
        };

        const submitMessage = async () => {
            try {
                if (!/\S/.test(message.value)) {
                    return;
                }

                // update other user message
                const otherUserRef = collection(
                    db,
                    `message/${route.params.id}/messages/${currentUser}/actual_message`
                );
                await setDoc(doc(otherUserRef), {
                    createdAt: Timestamp.now(),
                    text: message.value,
                    from: auth.currentUser.uid,
                })
                    .then(() => {
                        const colRef = collection(
                            db,
                            `message/${route.params.id}/messages`
                        );
                        setDoc(doc(colRef, currentUser), {
                            recent_message: {
                                createdAt: Timestamp.now(),
                                from: auth.currentUser.uid,
                                text: message.value,
                            },
                            userRef: doc(db, `users/${currentUser}`),
                        });
                    })
                    .catch((err) => {
                        throw err;
                    });

                // update current user message
                const currentUserRef = collection(
                    db,
                    `message/${currentUser}/messages/${route.params.id}/actual_message`
                );
                await setDoc(doc(currentUserRef), {
                    createdAt: Timestamp.now(),
                    text: message.value,
                    from: auth.currentUser.uid,
                })
                    .then(() => {
                        const colRef = collection(
                            db,
                            `message/${currentUser}/messages`
                        );
                        setDoc(doc(colRef, route.params.id), {
                            recent_message: {
                                createdAt: Timestamp.now(),
                                from: auth.currentUser.uid,
                                text: message.value,
                            },
                            userRef: doc(db, `users/${route.params.id}`),
                        });
                    })
                    .catch((err) => {
                        throw err;
                    });
                message.value = "";
            } catch (error) {
                console.log(error);
            }
        };

        watch(route, () => {
            getMessages();
            getChatInfo();
        });

        return {
            userInfo,
            submitMessage,
            currentUser,
            message,
            messages,
        };
    },
};
</script>

<style lang="postcss" scoped>
#backgroundImg {
    background-image: url("../assets/Pngtree.png");
}
.list-enter-active {
    animation: fade-in 250ms ease-in-out;
}
@keyframes fade-in {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }
}
</style>
