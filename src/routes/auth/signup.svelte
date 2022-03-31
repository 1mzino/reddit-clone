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
	import { googleAuth } from '$lib/utils/auth';
	import SignUp from '$lib/components/SignUp.svelte';
	import CreateProfile from '$lib/components/CreateProfile.svelte';
	let email;

	let authState = 'signUp';

	const handleRedirect = (newState) => {
		authState = newState;
	};
</script>

{#if authState === 'signUp' || null}
	<SignUp bind:email {googleAuth} {handleRedirect} />
{:else if authState === 'createProfile'}
	<CreateProfile {email} {handleRedirect} />
{/if}
