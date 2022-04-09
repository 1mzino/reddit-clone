<script>
	import SignUp from './SignUp.svelte';
	import SignIn from './SignIn.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let authState;
</script>

<!-- modal -->
<div class="hidden lg:flex flex-col items-center justify-center h-full w-full lg:fixed top-0  z-30">
	<div
		on:click|self={() => dispatch('closeModal', 'CLOSE')}
		class="fixed top-0 h-full w-full bg-black opacity-90 z-40"
	/>
	<!-- modal content -->
	<div class="flex rounded-md h-[600px] w-[705px] bg-white z-50">
		<div class="hidden bg-cover lg:block bg-[url('/authBg.png')] w-1/6 h-full rounded-l-md" />
		<div class="w-3/4 px-4">
			{#if authState === 'SIGN-UP'}
				<SignUp on:handleAuthState />
			{:else}
				<SignIn on:closeModal on:handleAuthState />
			{/if}
		</div>
	</div>
</div>
