module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				redditDarkBlue: '#1d2535',
				redditOrange: '#ff3d00'
			}
		},
		fontFamily: {
			sans: ['"IBM Plex Sans"', 'sans-serif']
		}
	},
	plugins: [require('@tailwindcss/line-clamp')]
};
