module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
    darkMode: false,
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#007aff',
                secondary: '#FBBF24',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}