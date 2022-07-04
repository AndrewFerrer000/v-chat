<template>
    <div class="grid place-items-center w-full h-screen bg-green-500">
        <div
            class="bg-white border border-green-500 flex flex-col justify-center items-center w-4/5 h-4/5 rounded-xl shadow-xl overflow-hidden"
        >
            <img
                src="@/assets/undraw_page_not_found_re_e9o6.svg"
                class="w-1/2 h-1/2"
            />
            <h1 class="font-bold text-2xl mt-10">Page not found</h1>
            <p class="text-gray-500">
                Please contact an admin about this issue, or
                <router-link
                    class="text-green-500 hover:text-green-700 font-semibold"
                    :to="{ name: 'home' }"
                    >Go back</router-link
                >
            </p>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style></style>
