<template>
    <router-view></router-view>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/main";
export default {
    created() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("TRUE");
            } else {
                console.log("FALSE");
            }
        });
    },
};
</script>

<style></style>
