<script>
	// @ts-nocheck

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	import { fade, fly } from 'svelte/transition';
	import { generateUsername } from '$lib/utils/generateUsername';
	import { createEventDispatcher, onMount } from 'svelte';
	import { updateProfileUsername } from '$lib/utils/getProfile';
	import { session } from '$app/stores';

	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	let username = generateUsername();
	let loading;
	let formState = false;
	let formError;
	let altUsernames = [...Array(3)].map(() => {
		return generateUsername();
	});

	onMount(async () => {
		await updateProfileUsername($session.user.id, username);
	});

	const handleFormState = () => {
		formState = true;
	};

	const generateUsernames = () => {
		let newList = altUsernames.map(() => generateUsername());

		altUsernames = newList;
	};

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			username
		},
		validationSchema: yup.object().shape({
			username: yup.string().required('Username is required')
		}),
		onSubmit: async (values) => {
			loading = true;

			const res = await updateProfileUsername($session.user.id, values.username);
			if (res.status === 'failed') {
				formError = 'Username is taken';
				loading = false;
				return;
			}

			return dispatch('closeModal');
		}
	});
</script>

<div
	transition:fade|local={{ duration: 200 }}
	class="fixed top-0 flex flex-col touch-none h-full w-full z-40 bg-black/90"
>
	<form
		class="flex items-center justify-center h-full w-full"
		on:submit|preventDefault={handleSubmit}
	>
		<div
			transition:fly={{ y: 200 }}
			class={`fixed bottom-0 lg:relative flex flex-col w-full lg:w-[400px] lg:h-[325px] py-6 lg:py-4 px-4 gap-4  items-center lg:items-start lg:justify-center bg-white z-50 lg:rounded-md
		${formState ? 'h-full rounded-t-none' : 'rounded-t-2xl'} 
		`}
		>
			{#if !formState}
				<img
					class="h-12 w-12 object-contain rounded-full bg-gray-100 px-1 py-0.5 my-1.5 mx-auto"
					src="/superhero.png"
					alt="superhero snoo"
				/>
				<p class="text-center text-sm">
					Before continuing, confirm that you want to keep this as your Reddit Username.
				</p>

				<p class="text-2xl py-1 mx-auto">u/<strong>{username}</strong></p>

				<button
					on:click={handleFormState}
					class="text-sm text-white font-bold rounded-full bg-redditBlue mt-1 py-2 w-[90%] lg:w-full"
					>Change Username</button
				>

				<button
					on:click={() => dispatch('closeModal')}
					type="button"
					class="text-sm text-gray-400 font-bold py-1  w-[90%] lg:w-full">Keep Username</button
				>
			{:else}
				<div class="flex flex-col w-full gap-2 px-2">
					<h1 class=" text-xl font-semibold">Change username</h1>
					<span
						class="inline-flex rounded-[4px] my-2 lg:text-md text-gray-500 border-[1px] px-4 py-3 w-full border-gray-200"
					>
						u/

						<input
							name="username"
							on:change={handleChange}
							bind:value={$form.username}
							class="w-full px-0.5 text-md outline-none text-black"
						/>
					</span>

					<div class="my-2 text-sm space-y-2">
						<span class="inline-flex w-full items-center justify-between">
							<h3 class="text-gray-400 font-medium">Can't think of one? Use one of these:</h3>
							<button type="button" on:click|preventDefault={() => generateUsernames()}>
								<svg class="h-[14px] w-[14px] fill-gray-400" viewBox="0 0 492.882 491.691">
									<g transform="translate(0 -0.596)">
										<path
											id="Path_7"
											data-name="Path 7"
											d="M122.941,374.241a171.455,171.455,0,0,1-44.1-63.1c-25.2-61.8-13.4-135.3,35.8-186l45.4,45.4c2.5,2.5,7,.7,7.6-3l24.8-162.3a4.04,4.04,0,0,0-4.6-4.6l-162.4,24.8c-3.7.6-5.5,5.1-3,7.6l45.5,45.5c-75.1,76.8-87.9,192-38.6,282a240,240,0,0,0,61.4,72.7c44.4,35.3,99,52.2,153.2,51.1l10.2-66.7C207.441,421.641,159.441,407.241,122.941,374.241Z"
										/>
										<path
											id="Path_8"
											data-name="Path 8"
											d="M424.941,414.341c75.1-76.8,87.9-192,38.6-282a240,240,0,0,0-61.4-72.7c-44.4-35.3-99-52.2-153.2-51.1l-10.2,66.7c46.6-4,94.7,10.4,131.2,43.4a171.455,171.455,0,0,1,44.1,63.1c25.2,61.8,13.4,135.3-35.8,186l-45.4-45.4c-2.5-2.5-7-.7-7.6,3l-24.8,162.3a4.04,4.04,0,0,0,4.6,4.6l162.4-24.8c3.7-.6,5.4-5.1,3-7.6Z"
										/>
									</g>
								</svg>
							</button>
						</span>

						{#each altUsernames as altUsername}
							<p
								on:click={(e) => ($form.username = e.target.textContent.trim())}
								class="cursor-pointer"
							>
								{altUsername}
							</p>
						{/each}
					</div>

					<div class="space-y-1">
						<!-- <button
							type="submit"
							class="text-sm text-white font-bold rounded-full bg-redditBlue mt-1 py-2 w-full"
							>Submit</button
						> -->

						<Button {loading} disabled={false}>Submit</Button>

						{#if formError}
							<p class="text-xs text-red-500 font-medium">
								{formError}
							</p>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</form>
</div>
