<template>
    <div class="relative w-full flex flex-col">
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
                    <p>HR Client</p>
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
                :class="{ 'justify-end': message.sender == currentUser }"
            >
                <img
                    :src="message.photoURL"
                    :class="{
                        'order-2': message.sender == currentUser,
                    }"
                    class="rounded-full w-10 h-10"
                />
                <div>
                    <p
                        class="rounded-lg bg-white py-2 px-4 max-w-xs sm:max-w-sm md:max-w-md"
                        :class="{
                            'bg-green-500 text-white order-1':
                                message.sender == currentUser,
                        }"
                    >
                        {{ message.text }}
                    </p>
                    <p
                        class="text-xs text-gray-500 mt-1 ml-2"
                        :class="{
                            'mr-2 text-right': message.sender == currentUser,
                        }"
                    >
                        {{ message.data_sent }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Actions -->
        <div
            class="w-full h-16 flex items-center justify-between gap-5 bg-white border-t border-gray-300 px-5 mt-auto"
        >
            <input
                class="w-full bg-gray-100 py-2 px-4 rounded-lg outline-none"
                type="text"
                placeholder="Message"
            />
            <div>
                <i
                    class="bx bx-send text-3xl text-green-500 transform -rotate-45"
                ></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentUser: "Andrew Ferrer",
            messages: [
                {
                    photoURL: "https://picsum.photos/200/300",
                    text: "What do you currently do in life?",
                    reciever: "Andrew Ferrer",
                    sender: "HR Client",
                    data_sent: "4:35 pm",
                },
                {
                    photoURL: "https://picsum.photos/200/310",
                    text: "Good question - I am still trying to figure that out!",
                    reciever: "HR Client",
                    sender: "Andrew Ferrer",
                    data_sent: "4:37 pm",
                },
                {
                    photoURL: "https://picsum.photos/200/300",
                    text: "What is your deepest desire?",
                    reciever: "Andrew Ferrer",
                    sender: "HR Client",
                    data_sent: "4:39 pm",
                },
                {
                    photoURL: "https://picsum.photos/200/310",
                    text: "Inner and outer peace",
                    reciever: "HR Client",
                    sender: "Andrew Ferrer",
                    data_sent: "4:40 pm",
                },
                {
                    photoURL: "https://picsum.photos/200/310",
                    text: "A compassionate world",
                    reciever: "HR Client",
                    sender: "Andrew Ferrer",
                    data_sent: "4:40 pm",
                },
                {
                    photoURL: "https://picsum.photos/200/300",
                    text: "What,would you say, is your strongest quality?",
                    reciever: "Andrew Ferrer",
                    sender: "HR Client",
                    data_sent: "4:42 pm",
                },
            ],
        };
    },
};
</script>

<style lang="postcss" scoped>
#backgroundImg {
    background-image: url("../assets/Pngtree.png");
}
</style>
