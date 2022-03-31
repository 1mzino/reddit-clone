<script>
	import { goto } from '$app/navigation';
	import { createForm } from 'svelte-forms-lib';

	export let email;
	export let handleRedirect;
	import { signUp } from '$lib/utils/auth';

	const { form, handleChange, handleSubmit } = createForm({
		initialValues: {
			email,
			username: '',
			password: ''
		},
		onSubmit: async (values) => {
			const user = await signUp(values.email, values.password, values.username);
			if (user) return goto('/');
		}
	});
</script>

<div class="flex flex-col gap-8 py-6 px-4">
	<div class="flex items-center justify-between">
		<span class="inline-flex items-center space-x-4">
			<button on:click={() => handleRedirect('signUp')}>
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

	<form on:submit={handleSubmit} class="space-y-4">
		<input
			name="username"
			on:change={handleChange}
			bind:value={$form.username}
			type="text"
			placeholder="Username"
			class="rounded-full w-full bg-gray-100 px-6 py-2 placeholder:text-gray-600"
		/>

		<input
			name="password"
			on:change={handleChange}
			bind:value={$form.password}
			type="password"
			placeholder="Password"
			class="rounded-full w-full bg-gray-100 px-6 py-2 placeholder:text-gray-600"
		/>

		<button
			type="submit"
			disabled={false}
			class="rounded-full w-full py-2 bg-gradient-to-r from-[#ec0623] to-[#ff8717] text-white font-bold disabled:opacity-30"
			>Sign Up</button
		>
	</form>
</div>
