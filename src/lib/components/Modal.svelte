<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const closeModal = (e) => {
		dispatch('closeModal', e);
	};

	import SignUp from './SignUp.svelte';
	export let authState = 'SIGN-UP';

	let email;
	import { googleAuth } from '$lib/utils/auth';
	import SignIn from './SignIn.svelte';
	const handleRedirect = (newState) => {
		authState = newState;
	};
</script>

<!-- modal -->
<div class="hidden lg:flex flex-col items-center justify-center h-full w-full lg:fixed top-0  z-30">
	<div
		on:click|self={() => closeModal('CLOSE')}
		class="fixed top-0 h-full w-full bg-black opacity-90 z-40"
	/>
	<!-- modal content -->
	<div class="p-4 rounded-2xl bg-white opacity-100 z-50">
		{#if authState === 'SIGN-UP'}
			<SignUp bind:email {googleAuth} {handleRedirect} />
		{:else}
			<SignIn />
		{/if}
	</div>
</div>
