<template>
    <form @submit.prevent="loginUser" class="flex flex-col gap-y-5 px-10">
        <div
            class="w-full flex items-center gap-5 border-b border-gray-400 focus-within:border-green-500 transition-colors"
        >
            <i class="bx bx-user text-2xl text-gray-400"></i>
            <input
                required
                type="text"
                placeholder="Email"
                class="w-full py-2 outline-none"
                v-model="email"
            />
        </div>
        <div
            class="w-full flex items-center gap-5 border-b border-gray-400 focus-within:border-green-500 transition-colors"
        >
            <i class="bx bx-key text-2xl text-gray-400"></i>
            <input
                required
                type="password"
                placeholder="Password"
                class="w-full py-2 outline-none"
                v-model="password"
            />
        </div>
        <div class="text-sm">
            <p>
                Want to join?
                <router-link
                    :to="{ name: 'register' }"
                    class="font-semibold text-green-500 hover:text-green-700"
                    >Register</router-link
                >
            </p>
            <a
                href="#"
                class="font-semibold text-green-500 hover:text-green-700"
            >
                Forgot password?
            </a>
        </div>
        <button
            class="bg-green-500 py-3 text-white tracking-wider font-semibold uppercase rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 hover:bg-green-600 transition-all"
            type="submit"
        >
            Login
        </button>
    </form>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
// ! THERE HAS A CURRENT USER, PLEASE SIGNOUT IT FIRST BEFORE CODING AGAIN...
import { auth } from "@/main";
export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        async loginUser() {
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((user) => {
                    console.log("Signed In: ", user.user);
                })
                .catch((err) => {
                    console.log(err);
                    switch (err.code) {
                        case "auth/invalid-email":
                            alert("Invalid email, please try again.");
                            break;
                        case "auth/user-not-found":
                            alert("Incorrect Email or Password, Try again");
                            break;
                        default:
                            console.log(err.code);
                            break;
                    }
                });
        },
    },
};
</script>

<style scoped></style>
