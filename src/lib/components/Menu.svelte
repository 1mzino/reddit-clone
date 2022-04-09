<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const handleMenuClick = () => {
		dispatch('handleMenuClick');
	};

	import { session } from '$app/stores';
	import { signOut } from '$lib/utils/auth';
	import { goto } from '$app/navigation';

	export let showMenu;

	const handleSignUp = () => {
		handleMenuClick();
		goto('/auth');
	};

	const handleSignOut = async () => {
		handleMenuClick();
		goto('/');
		signOut();
	};
</script>

{#if showMenu}
	<div class="fixed top-[49px]  lg:hidden flex flex-col h-full w-full">
		<div on:click={handleMenuClick} class="fixed top-0 h-full w-full bg-black opacity-90 z-20" />

		<div
			class="h-30 flex flex-col space-y-4 px-3 pt-3 pb-6 bg-redditDarkBlue dark:bg-zinc-900 z-30"
		>
			<input
				class="w-full bg-gray-700 dark:bg-zinc-800 text-gray-300 py-2 pl-6 text-sm rounded-full focus-visible:outline-none"
				placeholder="Search Reddit"
			/>

			<button
				on:click={!$session.user.authenticated ? handleSignUp : handleSignOut}
				class="w-full bg-blue-500 dark:bg-zinc-300 py-2 text-sm text-white dark:text-zinc-900 font-semibold rounded-full"
			>
				{#if !$session?.user.authenticated}
					Sign up or Log in
				{:else}
					Log out
				{/if}
			</button>
		</div>
	</div>
{/if}
