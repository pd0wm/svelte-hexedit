import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		paths: {
			base: dev ? '' : '/svelte-hexedit',
		},
		appDir: 'internal',
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true
		})
	}
};

export default config;
