<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import SignUp from './SignUp.svelte';
	import SignIn from './SignIn.svelte';

	const closeModal = (e) => {
		dispatch('closeModal', e);
	};

	export let authState = 'SIGN-UP';
	const handleAuthState = (e) => {
		authState = e.detail;
	};
</script>

<!-- modal -->
<div class="hidden lg:flex flex-col items-center justify-center h-full w-full lg:fixed top-0  z-30">
	<div
		on:click|self={() => closeModal('CLOSE')}
		class="fixed top-0 h-full w-full bg-black opacity-90 z-40"
	/>
	<!-- modal content -->
	<div class="flex rounded-md h-[600px] w-[705px] bg-white z-50">
		<div class="hidden lg:block bg-[url('/authBg.png')] w-1/4 h-full rounded-l-md" />
		<div class="w-3/4 px-4">
			{#if authState === 'SIGN-UP'}
				<SignUp on:handleAuthState={handleAuthState} />
			{:else}
				<SignIn on:handleAuthState={handleAuthState} />
			{/if}
		</div>
	</div>
</div>
