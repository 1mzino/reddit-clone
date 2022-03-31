<script>
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const openModal = (e) => {
		dispatch('openModal', e);
	};

	export let isMenuOpen;
	const handleMenuClick = (e) => {
		dispatch('handleMenuClick', e);
	};

	const handleLogoClick = (e) => {
		handleMenuClick(e);
		goto('/');
	};
</script>

<nav
	class={`sticky top-0 z-30 flex flex-row py-2 items-center justify-between bg-redditDarkBlue lg:bg-white lg:border-gray-200 border-b-[1px] px-3 lg:px-6 ${
		isMenuOpen ? ' border-transparent' : 'border-gray-800 drop-shadow-xl'
	}`}
>
	<!-- LOGO -->
	<div
		on:click={() => handleLogoClick('CLOSE')}
		class="flex flex-row items-center space-x-2 cursor-pointer"
	>
		<!-- reddit logo image -->
		<svg class="h-8 w-8" viewBox="0 0 20 20">
			>
			<circle fill="#FF4500" cx="10" cy="10" r="10" /><path
				fill="#FFF"
				d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"
			/></svg
		>
		<!-- reddit logo text -->
		<svg class="h-[18px] fill-white lg:fill-black" viewBox="0 0 57 18">
			><path
				d="M54.63,16.52V7.68h1a1,1,0,0,0,1.09-1V6.65a1,1,0,0,0-.93-1.12H54.63V3.88a1.23,1.23,0,0,0-1.12-1.23,1.2,1.2,0,0,0-1.27,1.11V5.55h-1a1,1,0,0,0-1.09,1v.07a1,1,0,0,0,.93,1.12h1.13v8.81a1.19,1.19,0,0,0,1.19,1.19h0a1.19,1.19,0,0,0,1.25-1.12A.17.17,0,0,0,54.63,16.52Z"
			/><circle fill="#FF4500" cx="47.26" cy="3.44" r="2.12" /><path
				d="M48.44,7.81a1.19,1.19,0,1,0-2.38,0h0v8.71a1.19,1.19,0,0,0,2.38,0Z"
			/><path
				d="M30.84,1.19A1.19,1.19,0,0,0,29.65,0h0a1.19,1.19,0,0,0-1.19,1.19V6.51a4.11,4.11,0,0,0-3-1.21c-3.1,0-5.69,2.85-5.69,6.35S22.28,18,25.42,18a4.26,4.26,0,0,0,3.1-1.23,1.17,1.17,0,0,0,1.47.8,1.2,1.2,0,0,0,.85-1.05ZM25.41,15.64c-1.83,0-3.32-1.77-3.32-4s1.48-4,3.32-4,3.31,1.78,3.31,4-1.47,3.95-3.3,3.95Z"
			/><path
				d="M43.28,1.19A1.19,1.19,0,0,0,42.09,0h0a1.18,1.18,0,0,0-1.18,1.19h0V6.51a4.15,4.15,0,0,0-3-1.21c-3.1,0-5.69,2.85-5.69,6.35S34.72,18,37.86,18A4.26,4.26,0,0,0,41,16.77a1.17,1.17,0,0,0,1.47.8,1.19,1.19,0,0,0,.85-1.05ZM37.85,15.64c-1.83,0-3.31-1.77-3.31-4s1.47-4,3.31-4,3.31,1.78,3.31,4-1.47,3.95-3.3,3.95Z"
			/><path
				d="M17.27,12.44a1.49,1.49,0,0,0,1.59-1.38v-.15a4.81,4.81,0,0,0-.1-.85A5.83,5.83,0,0,0,13.25,5.3c-3.1,0-5.69,2.85-5.69,6.35S10.11,18,13.25,18a5.66,5.66,0,0,0,4.39-1.84,1.23,1.23,0,0,0-.08-1.74l-.11-.09a1.29,1.29,0,0,0-1.58.17,3.91,3.91,0,0,1-2.62,1.12A3.54,3.54,0,0,1,10,12.44h7.27Zm-4-4.76a3.41,3.41,0,0,1,3.09,2.64H10.14A3.41,3.41,0,0,1,13.24,7.68Z"
			/><path
				d="M7.68,6.53a1.19,1.19,0,0,0-1-1.18A4.56,4.56,0,0,0,2.39,6.91V6.75A1.2,1.2,0,0,0,0,6.75v9.77a1.23,1.23,0,0,0,1.12,1.24,1.19,1.19,0,0,0,1.26-1.1.66.66,0,0,0,0-.14v-5A3.62,3.62,0,0,1,5.81,7.7a4.87,4.87,0,0,1,.54,0h.24A1.18,1.18,0,0,0,7.68,6.53Z"
			/></svg
		>
	</div>

	<!-- MOBILE NAV COMPONENT -->
	<div class="flex flex-row space-x-2">
		<!-- ADD NEW POST BUTTON -->
		<!-- <button class="h-8 w-8 lg:hidden">
          <svg class="h-5 w-5 mx-auto fill-white" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg"
          ><path
					clip-rule="evenodd"
					d="m13.1426.863281c-.6285 0-1.2317.247299-1.6793.688409l-.0014.00136-10.51536 10.27185c-.125682.1228-.19654.291-.19654.4667v3.9148c0 .3604.29212.6525.65247.6525h3.91482c.1756 0 .34379-.0708.46655-.1963l10.28296-10.51784c.44-.44925.6854-1.05368.6832-1.68253-.0023-.62912-.2522-1.23204-.6958-1.6782l-.4626.45995.4613-.4613-1.2267-1.22666-.003-.00297c-.4477-.44196-1.0515-.689769-1.6806-.689769zm.7626 1.617159 1.2236 1.22361c.2013.20275.3152.4771.3163.76282.001.28154-.1078.55288-.3022.75611-.0031.00319-.0061.00636-.0092.00952l-10.091 10.3215h-2.98776v-2.9876l8.36376-8.17003 1.3969 1.39694c.2548.2548.6679.2548.9227 0 .2548-.25481.2548-.66793 0-.92274l-1.3861-1.38613 1.024-1.0003.0024-.00239c.0029-.00278.0057-.00555.0085-.0083.2027-.19569.4735-.30523.7555-.30523.2853 0 .5592.11215.7626.31222z"
					fill="inherit"
					fill-rule="evenodd"
          /></svg
          >
        </button> -->

		<!-- MENU BUTTON -->
		<button on:click={handleMenuClick} class="h-8 w-8 lg:hidden">
			{#if !isMenuOpen}
				<!-- MENU CLOSED -->
				<svg class="h-5 w-5 mx-auto fill-white" viewBox="0 0 20 16">
					><path
						d="m19.1961 8.6h-18.08612c-.401914 0-.803828-.3-.803828-.8s.401914-.8.803828-.8h18.08612c.4019 0 .8038.3.8038.8s-.4019.8-.8038.8z"
					/><path
						d="m16.1818 1.6h-12.05742c-.40191 0-.80382-.4-.80382-.8s.40191-.8.80382-.8h12.05742c.4019 0 .8038.3.8038.8s-.4019.8-.8038.8z"
					/><path
						d="m16.1818 15.6h-12.05742c-.40191 0-.80382-.3-.80382-.8s.30143-.8.80382-.8h12.05742c.4019 0 .8038.3.8038.8s-.4019.8-.8038.8z"
					/></svg
				>
			{:else}
				<!-- MENU OPEN -->
				<svg
					class="h-5 w-5 mx-auto fill-gray-500"
					viewBox="0 0 18 18"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="m1.28033.21967c-.292893-.2928933-.767767-.2928933-1.06066 0-.2928933.292893-.2928933.767767 0 1.06066l7.46967 7.46967-7.46967 7.4697c-.2928933.2929-.2928933.7677 0 1.0606.292893.2929.767767.2929 1.06066 0l7.46967-7.46964 7.4697 7.46964c.2929.2929.7677.2929 1.0606 0s.2929-.7677 0-1.0606l-7.46964-7.4697 7.46964-7.46967c.2929-.292893.2929-.767767 0-1.06066-.2929-.2928933-.7677-.2928933-1.0606 0l-7.4697 7.46967z"
						fill="inherit"
					/></svg
				>
			{/if}
		</button>
	</div>

	<!-- DESKTOP SEARCH BAR -->
	<form class="relative hidden lg:flex flex-row items-center  min-w-[35%]">
		<img src="/search.svg" class="ml-2 h-[24px] w-[24px] z-10" alt="" />
		<p class="z-10 bg-zinc-300 ml-2 px-3 py-1 rounded-full text-sm font-medium">r/sveltejs</p>
		<input
			class="absolute left-0 py-2 pl-32 pr-4 border-[1px] border-gray-200 rounded-md text-sm font-regular min-w-[100%] focus-visible:outline focus-visible:outline-[1.5px] outline-blue-500 outline-offset-0 focus-visible:border-transparent placeholder:font-light"
			placeholder="Search Reddit"
		/>
	</form>

	<!-- DESKTOP AUTHENTICATION -->
	<div class="hidden lg:flex flex-row items-center space-x-4">
		{#if !$session.user.authenticated}
			<button
				on:click={() => openModal('SIGN-IN')}
				class=" font-semibold text-sm rounded-full px-8 py-1.5 border-[1px] border-sky-600 text-sky-600 hover:bg-sky-50 active:bg-sky-100"
				>Log In</button
			>
			<button
				on:click={() => openModal('SIGN-UP')}
				class="font-semibold text-sm rounded-full px-8 py-1.5 border-[1px] border-sky-700 bg-sky-700 hover:bg-sky-600 hover:border-sky-500 active:bg--500 active:border-sky-500 text-white"
				>Sign Up</button
			>
		{:else}
			<p>profile</p>
		{/if}
	</div>
</nav>
