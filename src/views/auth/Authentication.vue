<template>
    <div class="grid place-items-center w-full h-screen bg-green-500">
        <div
            class="relative bg-white border border-green-500 flex justify-center items-center w-4/5 h-4/5 rounded-xl shadow-xl overflow-hidden"
        >
            <!-- Left side-->
            <div
                class="hidden md:grid w-full h-full place-content-center overflow-hidden z-10"
            >
                <div class="w-60 h-56 lg:w-80 lg:h-72 z-10">
                    <img src="../../assets/undraw_chatting_re_j55r.svg" />
                </div>
                <div
                    class="absolute top-0 left-0 z-0 -translate-x-112 lg:-translate-x-2/4 -translate-y-1/4 scale-125 lg:scale-150 transition-transform duration-500"
                    style="width: 1000px"
                >
                    <svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#22C55E"
                            d="M33.2,-41.1C38.5,-35,35.2,-20.3,41.4,-4.4C47.6,11.5,63.3,28.5,61.8,40C60.3,51.4,41.6,57.1,23.9,62.1C6.1,67.1,-10.7,71.3,-27.2,68.1C-43.8,65,-60,54.5,-66.6,40C-73.3,25.4,-70.2,6.8,-60.3,-3.9C-50.4,-14.7,-33.8,-17.5,-22.6,-22.5C-11.4,-27.5,-5.7,-34.7,4.1,-39.6C13.9,-44.5,27.8,-47.1,33.2,-41.1Z"
                            transform="translate(100 100)"
                        />
                    </svg>
                </div>
            </div>
            <!-- Right side -->
            <div
                class="w-full lg:w-3/4 h-full flex flex-col p-10 z-10 mx-auto overflow-y-auto"
            >
                <div class="w-24 h-24 mx-auto">
                    <svg
                        class="w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        zoomAndPan="magnify"
                        viewBox="0 0 375 374.999991"
                        preserveAspectRatio="xMidYMid meet"
                        version="1.0"
                    >
                        <defs>
                            <clipPath id="id1">
                                <path
                                    d="M 59 5.796875 L 374.691406 5.796875 L 374.691406 217 L 59 217 Z M 59 5.796875 "
                                    clip-rule="nonzero"
                                />
                            </clipPath>
                            <clipPath id="id2">
                                <path
                                    d="M 0 81 L 317 81 L 317 369.742188 L 0 369.742188 Z M 0 81 "
                                    clip-rule="nonzero"
                                />
                            </clipPath>
                        </defs>
                        <g clip-path="url(#id1)">
                            <path
                                fill="#84ffb1"
                                d="M 374.230469 84.238281 L 374.230469 146.136719 C 374.230469 177.382812 356.011719 204.363281 329.636719 216.972656 L 329.636719 160.128906 C 329.636719 109.753906 288.730469 68.753906 238.457031 68.753906 L 78.734375 68.753906 C 71.996094 68.753906 65.429688 69.492188 59.105469 70.890625 C 65.414062 33.925781 97.546875 5.796875 136.234375 5.796875 L 295.957031 5.796875 C 339.183594 5.796875 374.230469 40.910156 374.230469 84.238281 Z M 374.230469 84.238281 "
                                fill-opacity="1"
                                fill-rule="nonzero"
                            />
                        </g>
                        <g clip-path="url(#id2)">
                            <path
                                fill="#22c55e"
                                d="M 238.457031 81.6875 L 78.71875 81.6875 C 35.503906 81.6875 0.457031 116.816406 0.457031 160.128906 L 0.457031 222.027344 C 0.457031 265.355469 35.503906 300.46875 78.71875 300.46875 L 85.636719 300.46875 L 85.636719 369.730469 L 95.546875 359.796875 C 133.445312 321.808594 184.855469 300.46875 238.445312 300.46875 C 281.671875 300.46875 316.707031 265.34375 316.707031 222.027344 L 316.707031 160.128906 C 316.71875 116.816406 281.683594 81.6875 238.457031 81.6875 Z M 238.457031 81.6875 "
                                fill-opacity="1"
                                fill-rule="nonzero"
                            />
                        </g>
                        <path
                            fill="#ffffff"
                            d="M 163.914062 210.230469 L 201.777344 146.335938 L 179.59375 146.335938 L 163.914062 173.433594 L 163.914062 173.445312 L 148.257812 146.335938 L 126.050781 146.335938 Z M 163.914062 210.230469 "
                            fill-opacity="1"
                            fill-rule="nonzero"
                        />
                        <path
                            fill="#ffffff"
                            d="M 207.660156 146.363281 L 163.914062 220.183594 L 120.167969 146.363281 L 96.152344 146.363281 L 163.914062 263.769531 L 231.675781 146.363281 Z M 207.660156 146.363281 "
                            fill-opacity="1"
                            fill-rule="nonzero"
                        />
                    </svg>
                </div>
                <div class="text-center mb-5">
                    <h1 class="font-bold text-lg">Welcome to VChat</h1>
                    <p class="font-thin text-base text-gray-500">
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style></style>
