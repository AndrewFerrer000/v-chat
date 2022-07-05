<template>
    <div
        class="bg-white border-r border-gray-300 w-20 lg:w-80 flex flex-col gap-2"
    >
        <!-- Current User -->
        <div
            class="hidden lg:flex gap-5 items-center justify-between lg:px-3 my-5"
        >
            <i
                @click="logoutUser()"
                class="bx bx-log-out text-2xl text-gray-500 hover:text-red-500 cursor-pointer"
            ></i>
            <router-link to="#" class="flex items-center gap-3">
                <img
                    src="https://picsum.photos/200/310"
                    class="rounded-full w-12 h-12"
                />
                <p>Andrew Ferrer</p>
            </router-link>
            <i
                class="bx bx-message-add text-2xl text-gray-500 hover:text-green-500 cursor-pointer"
            ></i>
        </div>

        <!-- Search box -->
        <div class="flex justify-center lg:justify-start my-5 lg:px-3 lg:my-0">
            <div
                class="w-12 lg:w-full h-12 bg-gray-100 rounded-full grid place-items-center lg:flex lg:px-5"
            >
                <i class="bx bx-search text-2xl"></i>
                <input
                    type="text"
                    placeholder="Search"
                    class="hidden lg:block bg-transparent outline-none ml-3"
                />
            </div>
        </div>

        <!-- List -->
        <div
            class="user-list w-full relative flex flex-col items-center gap-2 lg:items-start overflow-x-hidden"
            v-for="list in $store.state.userlist"
            :key="list"
        >
            <router-link :to="{ name: 'message' }" v-if="list" class="w-full">
                <div
                    class="flex gap-2 cursor-pointer hover:scale-95 lg:hover:scale-100 transition-all lg:hover:bg-gray-100 lg:p-3"
                >
                    <img
                        src="https://picsum.photos/200/300"
                        class="rounded-full border-2 border-green-500 p-1 w-12 h-12"
                    />
                    <div class="hidden w-4/5 lg:block">
                        <p class="font-semibold truncate capitalize">
                            {{ list.display_name }}
                        </p>
                        <p class="truncate text-gray-400">
                            {{ list.recent_message }}
                        </p>
                    </div>
                </div>
            </router-link>
        </div>

        <!-- New Message and Logout -->
        <div
            class="border-t-2 border-gray-300 py-1 mt-auto self-center lg:hidden"
        >
            <div class="w-12 h-14 flex justify-center items-center">
                <i
                    class="bx bx-message-add text-2xl text-gray-500 hover:text-green-500 cursor-pointer"
                ></i>
            </div>
            <div class="w-12 h-14 flex justify-center items-center">
                <i
                    @click="logoutUser()"
                    class="bx bx-log-out text-2xl text-gray-500 hover:text-red-500 cursor-pointer"
                ></i>
            </div>
        </div>
    </div>
</template>

<script>
import { signOut } from "firebase/auth";
import { auth } from "@/main";
export default {
    async mounted() {
        this.$store.dispatch("GET_USERLIST");
    },
    methods: {
        logoutUser() {
            signOut(auth)
                .then(() => {
                    this.$router.replace({ name: "authentication" });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style scoped>
@media screen and (max-width: 1024px) {
    .user-list {
        overflow-y: overlay;
    }
    /* width */
    .user-list::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
}
</style>
