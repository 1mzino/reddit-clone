<script context="module">
	export async function load({ session }) {
		if (session.user.authenticated) {
			return {
				status: 301,
				redirect: '/'
			};
		}

		return {
			props: {}
		};
	}
</script>

<script>
	import SignUp from '$lib/components/SignUp.svelte';
	import SignIn from '$lib/components/SignIn.svelte';

	export let authState = 'SIGN-UP';
	const handleAuthState = (e) => {
		authState = e.detail;
	};
</script>

<div class="flex h-screen w-screen lg:fixed top-0 lg:z-50 bg-white">
	<div class="hidden lg:block bg-[url('/authBg.png')] w-1/6 min-h-max rounded-l-md" />
	<div class="lg:w-2/5 lg:px-4 ">
		{#if authState === 'SIGN-UP'}
			<SignUp on:handleAuthState={handleAuthState} />
		{:else}
			<SignIn on:handleAuthState={handleAuthState} />
		{/if}
	</div>
</div>
