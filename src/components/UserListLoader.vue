<template>
    <div
        class="bg-white border-r border-gray-300 w-20 lg:w-96 flex flex-col gap-2 animate-pulse"
    >
        <!-- Current User -->
        <div
            class="hidden lg:flex gap-5 items-center justify-center lg:px-3 my-5"
        >
            <div class="flex items-center gap-3">
                <div class="rounded-full bg-gray-100 w-12 h-12" />
                <p class="bg-gray-100 w-28 h-4 rounded-md"></p>
            </div>
        </div>

        <!-- Search box -->
        <div class="flex justify-center lg:justify-start my-5 lg:px-3 lg:my-0">
            <div
                class="w-14 lg:w-full h-14 bg-gray-100 rounded-full lg:flex lg:px-6"
            ></div>
        </div>

        <div
            class="user-list w-full relative flex flex-col items-center lg:items-start overflow-x-hidden"
        >
            <div class="w-full p-2 lg:p-3">
                <div
                    class="w-full flex justify-center gap-5 mb-5"
                    v-for="index of 4"
                    :key="index"
                >
                    <div class="rounded-full bg-gray-100 w-12 h-12" />
                    <div class="hidden w-4/5 lg:flex flex-col justify-between">
                        <p class="bg-gray-100 w-36 h-4 rounded-md"></p>
                        <p class="bg-gray-100 w-24 h-4 rounded-md"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style></style>
