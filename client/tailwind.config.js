/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
        height: {
            'screen-minus-300px': 'calc(100vh - 300px)',
        },
        colors: {
            'accent-pink': '#FFA1BD',
            'accent-orange': '#FEB055',
            'accent-yellow': '#FFF173',
            'accent-blue': '#A0D7FF',
            'accent-purple': '#D4A0F4',
            'accent-lightpink': '#FFE4EC',
            'accent-lightpink-hover': '#ffecf1',
            'accent-darkpink': '#FF6E99',
            'accent-yellow-text': '#DFCE37',
            'coins-yellow': '#fc4',
            'textgrey': '#A7A7A7',
            'bg': '#F5F5F5'
        },
        fontFamily: {
            'open-sans': ['Open Sans', 'sans-serif'],
            'roboto': ['Roboto', 'sans-serif']
        },
        borderRadius: {
            'container': '20px',
            'nav-links': '15px',
            'small-button': '7px',
            'button-tooltip': '5px',
            'primary-button': '10px',
        },
        padding: {
            'container': '30px',
            'container-spacing': '40px'
        },
        gap: {
            'container-spacing': '40px',
        },
        fontSize: {
            'xxs': '0.75rem',
            'xs': '0.82rem',
            'small': '0.875rem',
            'base': '0.938rem',
            'medium': '1.25rem',
            'header': '1.375rem',
        },
        boxShadow: {
            'pink': '2px 2px 8px rgba(255, 110, 153, 0.6)'
        }
        },
    },
    plugins: [],
}

