module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				redditBlue: '#0079D3',
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
