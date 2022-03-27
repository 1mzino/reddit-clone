<script>
	import { user } from '$lib/store/authStore';

	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';

	export let isMenuOpen;
	export let handleMenuClick;

	const handleSignUp = () => {
		goto('/auth');
		handleMenuClick();
	};

	const handleSignOut = () => {
		supabase.auth.signOut();
		goto('/');
		handleMenuClick();
	};
</script>

{#if isMenuOpen}
	<div class="fixed top-[49px] z-50 lg:hidden flex flex-col h-full w-full">
		<div class="h-30 flex flex-col space-y-4 px-3 pt-3 pb-6 bg-redditDarkBlue">
			<input
				class="w-full bg-gray-700 text-gray-300 py-2 pl-6 text-sm rounded-full focus-visible:outline-none"
				placeholder="Search Reddit"
			/>

			{#if !$user}
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

		<div on:click={handleMenuClick} class="grow bg-black opacity-90 touch-none" />
	</div>
{/if}
