<template>
    <div class="w-full h-screen flex">
        <user-list></user-list>
        <router-view />
    </div>
</template>

<script>
import UserList from "@/components/UserList.vue";

export default {
    components: { UserList },
    data() {
        return {};
    },
};
</script>

<style></style>
