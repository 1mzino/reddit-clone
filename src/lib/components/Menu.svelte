<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const handleMenuClick = () => {
		dispatch('handleMenuClick');
	};

	export let setUsername = false;

	import { session } from '$app/stores';
	import { signOut } from '$lib/utils/auth';
	import { goto } from '$app/navigation';

	export let isMenuOpen;

	const handleSignUp = () => {
		handleMenuClick();
		goto('/auth/signup');
	};

	const handleSignOut = async () => {
		handleMenuClick();
		goto('/');
		signOut();
	};
</script>

{#if isMenuOpen}
	<div class="fixed top-[49px] z-10 lg:hidden flex flex-col h-full w-full">
		<div class="h-30 flex flex-col space-y-4 px-3 pt-3 pb-6 bg-redditDarkBlue">
			<input
				class="w-full bg-gray-700 text-gray-300 py-2 pl-6 text-sm rounded-full focus-visible:outline-none"
				placeholder="Search Reddit"
			/>

			{#if !$session?.user.authenticated}
				<button
					on:click={handleSignUp}
					class="w-full bg-blue-500 py-2 text-sm text-white font-semibold rounded-full"
				>
					Sign up or Log in
				</button>
			{:else}
				<button
					on:click={handleSignOut}
					class="w-full bg-blue-500 py-2 text-sm text-white font-semibold rounded-full"
				>
					Log out
				</button>
			{/if}
		</div>

		<div
			on:click={handleMenuClick}
			class={`grow ${!setUsername ? 'bg-black opacity-90' : 'bg-none opacity-0'} touch-none`}
		/>
	</div>
{/if}
