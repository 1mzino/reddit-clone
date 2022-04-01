<script>
	import { goto } from '$app/navigation';
	import { page, session } from '$app/stores';
	import { createForm } from 'svelte-forms-lib';

	import { signIn, googleAuth } from '$lib/utils/auth';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const handleSignIn = () => {
		dispatch('closeModal', 'CLOSE');
		goto('/');
	};

	$: oauth = $page.url.search;
	const { form, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: async (values) => {
			const user = await signIn(values.email, values.password);
			if (user) return handleSignIn();
		}
	});
</script>

<div class="flex flex-col gap-2 py-6 px-4">
	<div class="space-y-1">
		<h1 class="text-xl lg:text-md font-semibold">Log in</h1>
		<p class="text-sm lg:text-xs text-gray-600">
			By continuing, you are setting up a Reddit account and agree to our <span
				class="text-blue-500 font-medium"
				>User Agreement
			</span>
			and <span class="text-blue-500 font-medium"> Privacy Policy. </span>
		</p>
	</div>

	<!-- social providers -->
	<div class="mt-8 space-y-4 lg:w-[60%]">
		<button
			disabled={$page.url.search === '?oauth' ? true : false}
			on:click={googleAuth}
			class="relative rounded-full w-full py-2.5 border-[1px] border-gray-200 active:border-blue-200 active:bg-blue-50 text-gray-600 font-medium"
		>
			<p class="flex justify-center items-center text-sm lg:text-xs">
				<span class="absolute left-4">
					<svg class="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
							<path
								fill="#4285F4"
								d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
							/>
							<path
								fill="#34A853"
								d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
							/>
							<path
								fill="#FBBC05"
								d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
							/>
							<path
								fill="#EA4335"
								d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
							/>
						</g>
					</svg>
				</span>
				Continue with Google
			</p>
		</button>

		{#if $page.url.search === '?oauth'}
			<p class="text-sm lg:text-xs text-blue-500 font-medium animate-pulse">
				You are now logged in. You will soon be redirected.
			</p>
		{/if}

		<div class="mt-4 flex flex-row items-center space-x-6 text-sm text-gray-400 font-medium">
			<div class="w-[50%] border-b-[1px] border-gray-200" />
			<p>OR</p>
			<div class="w-[50%] border-b-[1px] border-gray-200" />
		</div>
	</div>
	<!-- sign in with email -->
	<form on:submit={handleSubmit} class="space-y-4 lg:max-w-[60%]">
		<input
			on:change={handleChange}
			disabled={$page.url.search === '?oauth' ? true : false}
			bind:value={$form.email}
			class={`rounded-full lg:rounded-sm w-full lg:text-sm bg-gray-100 lg:${
				$page.url.search === '?oauth' ? 'bg-yellow-100' : 'bg-white'
			} lg:border-[1px] border-gray-200 px-4 py-2 placeholder:text-gray-600`}
			type="text"
			placeholder={$session.user.email ? $session.user.email : 'Email'}
		/>

		<input
			on:change={handleChange}
			disabled={$page.url.search === '?oauth' ? true : false}
			bind:value={$form.password}
			class={`rounded-full lg:rounded-sm w-full lg:text-sm bg-gray-100 ${
				$page.url.search === '?oauth' ? 'lg:bg-yellow-100' : 'lg:bg-white'
			} lg:border-[1px] border-gray-200 px-4 py-2 placeholder:text-gray-600`}
			type="password"
			placeholder={$session.user.authenticated ? '********' : 'Password'}
		/>

		<button
			type="submit"
			disabled={$page.url.search === '?oauth' ? true : false}
			class="rounded-full w-full   lg:text-sm py-2 bg-gradient-to-r from-[#ec0623] to-[#ff8717]
			lg:from-sky-600 lg:to-sky-600 text-white font-bold"
		>
			{#if $page.url.search === '?oauth'}
				Logging In
			{:else}
				Log In
			{/if}
		</button>
	</form>
	<p class="mt-12 text-sm text-gray-800 lg:text-xs">
		New to Reddit? <span
			on:click={() => dispatch('handleAuthState', 'SIGN-UP')}
			class="cursor-pointer text-blue-600 font-medium"
		>
			Sign up
		</span>
	</p>
</div>
