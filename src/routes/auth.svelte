<script>
	import SignUp from '$lib/components/SignUp.svelte';
	import SignIn from '$lib/components/SignIn.svelte';
	import CreateProfile from '$lib/components/CreateProfile.svelte';
	import supabase from '$lib/supabase';

	let email;

	let authState = 'signUp';

	const handleRedirect = (newState) => {
		authState = newState;
	};

	const handleSignUp = async (email, password, username) => {
		try {
			const { user, error } = await supabase.auth.signUp(
				{
					email,
					password
				},
				{
					data: {
						username
					}
				}
			);

			if (error) throw error;
			return user;
		} catch (err) {
			console.log(err);
		}
	};

	const handleSignIn = async (email, password) => {
		try {
			const { user, error } = await supabase.auth.signIn({ email, password });

			if (error) throw error;
			return user;
		} catch (err) {
			console.log('error signing in', err);
		}
	};

	const handleGoogleAuth = async () => {
		try {
			const { error } = await supabase.auth.signIn({ provider: 'google' });

			if (error) throw error;
		} catch (err) {
			console.log('error with google auth', err);
		}
	};
</script>

{#if authState === 'signUp'}
	<SignUp bind:email {handleRedirect} {handleGoogleAuth} />
{/if}

{#if authState === 'createProfile'}
	<CreateProfile {email} {handleSignUp} {handleRedirect} />
{/if}

{#if authState === 'signIn'}
	<SignIn {handleSignIn} {handleRedirect} {handleGoogleAuth} />
{/if}
