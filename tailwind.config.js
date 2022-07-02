/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            height: {
                18: "4.5rem",
            },
        },
    },
    plugins: [],
};
