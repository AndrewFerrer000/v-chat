<template>
    <form @submit.prevent="registerUser" class="flex flex-col gap-y-5 px-10">
        <div
            class="w-full flex items-center gap-5 border-b border-gray-400 focus-within:border-green-500 transition-colors"
        >
            <i class="bx bxs-purchase-tag text-2xl text-gray-400"></i>
            <input
                required
                type="text"
                placeholder="Display Name"
                class="w-full py-2 outline-none"
                v-model="display_name"
            />
        </div>
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
                Already have an account?
                <router-link
                    :to="{ name: 'login' }"
                    class="font-semibold text-green-500 hover:text-green-700"
                    >Login</router-link
                >
            </p>
        </div>
        <button
            class="bg-green-500 py-3 text-white tracking-wider font-semibold uppercase rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 hover:bg-green-600 transition-all"
            type="submit"
        >
            Register
        </button>
    </form>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "@/main";

export default {
    data() {
        return {
            id: "",
            email: "",
            password: "",
            display_name: "",
            created_At: "",
        };
    },
    methods: {
        async registerUser() {
            await createUserWithEmailAndPassword(
                auth,
                this.email,
                this.password
            )
                .then((user) => {
                    alert("New user is created!");

                    const docRef = doc(db, `users/${user.user.uid}`);
                    setDoc(docRef, {
                        id: user.user.uid,
                        display_name: this.display_name,
                        email: user.user.email,
                        created_At: Timestamp.now(),
                    });

                    this.email = "";
                    this.password = "";
                    this.display_name = "";
                })
                .catch((err) => {
                    console.log(err);
                    switch (err.code) {
                        case "auth/email-already-exists":
                            alert("Email is already taken");
                            break;
                        case "auth/email-already-in-use":
                            alert("Email is already in use");
                            break;
                        case "auth/invalid-email":
                            alert("Invalid email");
                            break;
                        default:
                            console.log(err.code);
                    }
                });
        },
    },
};
</script>

<style scoped></style>
