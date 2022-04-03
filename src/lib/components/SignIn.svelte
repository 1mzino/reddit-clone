<script>
	import { goto } from '$app/navigation';
	import { page, session } from '$app/stores';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { signIn, googleAuth } from '$lib/utils/auth';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let formError;
	const handleSignIn = () => {
		dispatch('closeModal', 'CLOSE');
		goto('/');
	};

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email('You must enter a valid email').required('Email is required'),
			password: yup.string().required('Password is required')
		}),
		onSubmit: async (values) => {
			const res = await signIn(values.email, values.password);
			console.log(res);
			if (res.status === 'failed') return (formError = res.message);

			return handleSignIn();
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
			disabled={$page.url.search ? true : false}
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

		{#if $page.url.search}
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
	<form on:submit|preventDefault={handleSubmit} class="space-y-4 lg:max-w-[60%]">
		<div class="space-y-2 lg:space-y-1">
			<div class="relative flex items-center">
				<input
					name="email"
					on:change={handleChange}
					disabled={$page.url.search ? true : false}
					bind:value={$form.email}
					class={`rounded-full lg:rounded-sm w-full px-4 py-2 lg:text-sm bg-gray-100  lg:border-[1px] border-gray-200 ${
						$page.url.search
							? 'lg:bg-yellow-100 placeholder:text-black'
							: 'lg:bg-white placeholder:text-gray-600'
					}`}
					type="text"
					placeholder={$session.user.email ? $session.user.email : 'Email'}
				/>
				{#if $errors.email}
					<p class="absolute right-6 lg:right-4 text-md text-red-500 font-medium">!</p>
				{/if}
			</div>
			{#if $errors.email}
				<p class="text-xs text-red-500 px-4 lg:px-0 font-medium">{$errors.email}</p>
			{/if}
		</div>

		<div class="space-y-2 lg:space-y-1">
			<div class="relative flex  items-center">
				<input
					on:change={handleChange}
					disabled={$page.url.search ? true : false}
					bind:value={$form.password}
					class={`rounded-full lg:rounded-sm w-full px-4 py-2 lg:text-sm bg-gray-100  lg:border-[1px] border-gray-200 ${
						$page.url.search
							? 'lg:bg-yellow-100 placeholder:text-black'
							: 'lg:bg-white placeholder:text-gray-600'
					}`}
					type="password"
					placeholder={$session.user.authenticated ? '********' : 'Password'}
				/>
				{#if $errors.password}
					<p class="absolute right-6 lg:right-4  text-md text-red-500 font-medium">!</p>
				{/if}
			</div>
			{#if $errors.password}
				<p class="text-xs text-red-500 px-4 lg:px-0 font-medium">{$errors.password}</p>
			{/if}
		</div>
		<div class="space-y-2">
			<button
				type="submit"
				disabled={$page.url.search ? true : false}
				class="rounded-full w-full   lg:text-sm py-2 bg-gradient-to-r from-[#ec0623] to-[#ff8717]
		lg:from-sky-600 lg:to-sky-600 text-white font-bold disabled:opacity-30"
			>
				{#if $page.url.search === '? $page.url.search'}
					Logging In
				{:else}
					Log In
				{/if}
			</button>

			{#if formError}
				<p class="text-xs text-red-500 px-4 lg:px-0 font-medium">{formError}</p>
			{/if}
		</div>
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
