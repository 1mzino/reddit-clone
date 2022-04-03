<script>
	import { goto } from '$app/navigation';
	import { googleAuth, signUp } from '$lib/utils/auth';
	import * as yup from 'yup';

	import { createForm } from 'svelte-forms-lib';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let formState = 'SIGN-UP';
	let formError;
	const handleFormState = (newState) => {
		formState = newState;
	};

	const { form, errors, touched, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: '',
			username: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email('You must enter a valid email').required('Email is required'),
			username: yup
				.string()
				.min(3, 'Username must be between 3 and 20 characters')
				.max(20, 'Username must be between 3 and 20 characters')
				.required('Username is required'),
			password: yup
				.string()
				.min(6, 'Password must be at least 6 characters')
				.required('Password is required')
		}),
		onSubmit: async (values) => {
			const res = await signUp(values.email, values.password, values.username);
			if (res.status === 'failed') return (formError = res.message);

			return dispatch('handleAuthState', 'SIGN-IN');
		}
	});
</script>

<div class={`flex flex-col py-6 ${formState === 'SIGN-UP' ? 'gap-2  px-4' : 'gap-6 px-4'}`}>
	{#if formState === 'SIGN-UP'}
		<div class="space-y-1">
			<h1 class="text-xl lg:text-md font-semibold">Sign up</h1>
			<p class="text-sm lg:text-xs text-gray-600">
				By continuing, you are setting up a Reddit account and agree to our <span
					class="text-blue-500 font-medium"
					>User Agreement
				</span>
				and <span class="text-blue-500 font-medium"> Privacy Policy. </span>
			</p>
		</div>

		<!-- social providers -->
		<div class="mt-8 lg:max-w-[60%] space-y-4">
			<button
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

			<div class="flex flex-row items-center space-x-6 text-sm text-gray-400 font-medium">
				<div class="w-[50%] border-b-[1px] border-gray-200" />
				<p>OR</p>
				<div class="w-[50%] border-b-[1px] border-gray-200" />
			</div>
		</div>
	{:else}
		<div class="space-y-1">
			<div class="flex items-center justify-between">
				<span class="inline-flex items-center space-x-3">
					<button
						on:click={() => {
							handleFormState('SIGN-UP');
						}}
					>
						<svg class="fill-gray-500 h-3" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
							<path
								clip-rule="evenodd"
								d="M12.9987 6.00025H3.41275L7.70575 1.70725C8.09675 1.31625 8.09675 0.68425 7.70575 0.29325C7.31475 -0.09775 6.68275 -0.09775 6.29175 0.29325L0.29175 6.29225C0.19975 6.38525 0.12675 6.49625 0.07575 6.61825C-0.02525 6.86225 -0.02525 7.13825 0.07575 7.38225C0.12675 7.50425 0.19975 7.61525 0.29175 7.70825L6.29175 13.7072C6.48675 13.9022 6.74275 14.0002 6.99875 14.0002C7.25475 14.0002 7.51075 13.9022 7.70575 13.7072C8.09675 13.3162 8.09675 12.6842 7.70575 12.2933L3.41275 8.00025H12.9987C13.5507 8.00025 13.9987 7.55225 13.9987 7.00025C13.9987 6.44825 13.5507 6.00025 12.9987 6.00025Z"
							/>
						</svg>
					</button>
					<h1 class="text-xl font-semibold">Create your account</h1>
				</span>
			</div>
			<p class="text-sm lg:text-xs text-gray-600">
				Your username is how other community members will see you.
			</p>
		</div>
	{/if}

	<!-- sign up with email -->
	<form
		on:submit|preventDefault={(e) => {
			if ($errors.email) {
				return (formState = 'SIGN-UP');
			}
			return handleSubmit(e);
		}}
		class="space-y-4 lg:w-[60%]"
	>
		{#if formState === 'SIGN-UP'}
			<div class="space-y-1">
				<div class="relative flex items-center">
					<input
						name="email"
						on:change={handleChange}
						bind:value={$form.email}
						class="rounded-full lg:rounded-sm w-full lg:text-sm bg-gray-100 lg:bg-transparent lg:border-[1px] border-gray-200 px-4 py-2 placeholder:text-gray-600"
						type="text"
						placeholder="Email"
					/>
					{#if $errors.email}
						<p class="absolute right-6 lg:right-4  text-md text-red-500 font-medium">!</p>
					{/if}
				</div>
				{#if $errors.email}
					<p class="text-xs text-red-500 px-4 lg:px-0 font-medium">{$errors.email}</p>
				{/if}
			</div>

			<button
				on:click={() => handleFormState('CREATE-PROFILE')}
				disabled={$touched.email && $errors.email ? true : false}
				class="rounded-full w-full lg:text-sm py-2 bg-gradient-to-r from-[#ec0623] to-[#ff8717] lg:from-sky-600 lg:to-sky-600 text-white font-bold cursor-pointer"
				>Continue</button
			>
		{:else if formState === 'CREATE-PROFILE'}
			<div class="space-y-1">
				<div class="relative flex items-center">
					<input
						name="username"
						on:change={handleChange}
						bind:value={$form.username}
						type="text"
						placeholder="Username"
						class="rounded-full w-full lg:rounded-sm  lg:text-sm bg-gray-100 lg:bg-transparent lg:border-[1px] border-gray-200 px-4 py-2 placeholder:text-gray-600"
					/>
					{#if $errors.username}
						<p class="absolute right-6 lg:right-4  text-md text-red-500 font-medium">!</p>
					{/if}
				</div>
				{#if $errors.username}
					<p class="text-xs text-red-500 px-4 lg:px-0 font-medium">{$errors.username}</p>
				{/if}
			</div>

			<div class="space-y-1">
				<div class="relative flex items-center">
					<input
						name="password"
						on:change={handleChange}
						bind:value={$form.password}
						class="rounded-full lg:rounded-sm w-full px-4 py-2 lg:text-sm bg-gray-100  lg:border-[1px] border-gray-200 lg:bg-white placeholder:text-gray-600"
						type="password"
						placeholder="Password"
					/>
					{#if $errors.password}
						<p class="absolute right-6 lg:right-4  text-md text-red-500 font-medium">!</p>
					{/if}
				</div>
				{#if $errors.password}
					<p class="text-xs text-red-500 px-4 lg:px-0 font-medium">{$errors.password}</p>
				{/if}
			</div>
			<div class="space-y-1">
				<button
					type="submit"
					disabled={false}
					class="rounded-full w-full lg:text-sm py-2 bg-gradient-to-r from-[#ec0623] to-[#ff8717]   lg:from-sky-600 lg:to-sky-600 text-white font-bold"
					>Sign Up</button
				>
				{#if formError}
					<p class="text-xs text-red-500 px-4 lg:px-0 font-medium">{formError}</p>
				{/if}
			</div>
		{/if}
	</form>
	<p class="mt-12 text-sm text-gray-800 lg:text-xs">
		Already a redditor? <span
			on:click={() => dispatch('handleAuthState', 'SIGN-IN')}
			class="cursor-pointer text-blue-600 font-medium">Log In</span
		>
	</p>
</div>
