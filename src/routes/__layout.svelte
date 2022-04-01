<script>
	import { page } from '$app/stores';
	import supabase from '$lib/supabase';
	import { session } from '$app/stores';
	import { setAuthCookie, unsetAuthCookie } from '$lib/session';
	import { combinedUserMapper } from '$lib/mappers/users';
	import { getProfileById } from '$lib/utils/getProfile';

	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	let promptUsername = false;
	$: showUsername = promptUsername;
	let isMenuOpen = false;

	let authState = $page.url.search === '?oauth' ? 'SIGN-IN' : 'SIGN-UP';
	let showAuthModal = $page.url.search === '?oauth' ? true : false;
	let showLoading = $page.url.search === '?oauth' ? true : false;

	onMount(() => {
		if ($page.url.search === '?oauth') {
			return setTimeout(() => (window.location.href = 'http://localhost:3000/'), 1500);
		}

		if ($session.user.authenticated && !$session.user.username) {
			return (promptUsername = true);
		}
	});

	const toggleAuthModal = (e) => {
		if (e.detail === 'CLOSE') {
			return (showAuthModal = false);
		}

		authState = e.detail;
		showAuthModal = true;
	};

	const toggleMenu = (e) => {
		if (e.detail === 'CLOSE') {
			return (isMenuOpen = false);
		}

		isMenuOpen = !isMenuOpen;
	};

	supabase.auth.onAuthStateChange(async (event, _session) => {
		if (event === 'SIGNED_OUT') {
			session.set({ user: combinedUserMapper({}) });
			await unsetAuthCookie();
		}
		if (event === 'SIGNED_IN') {
			const sessionUser = _session.user;
			const profile = await getProfileById(sessionUser?.id);
			const user = combinedUserMapper({ ...sessionUser, ...profile });
			session.set({ user });
			await setAuthCookie(_session);
		}
	});
</script>

<div class="flex flex-col min-h-screen w-screen bg-white touch-manipulation">
	<Navbar
		on:openModal={toggleAuthModal}
		on:handleMenuClick={toggleMenu}
		{isMenuOpen}
		{showLoading}
	/>

	<!-- children -->

	<slot />

	<!-- Menu as 'portal' -->
	<Menu on:handleMenuClick={toggleMenu} {isMenuOpen} />

	<!-- Desktop Auth (Mobile Auth uses Auth Routes) -->
	{#if showAuthModal}
		<Modal {authState} on:closeModal={toggleAuthModal} />
	{/if}

	<!-- Mobile oauth loading -->
	{#if showLoading}
		<div
			class="fixed top-[48px] lg:hidden h-full w-full flex items-center bg-redditDarkBlue justify-center z-30 "
		>
			<div class="grow flex justify-center items-center">
				<svg class="animate-bounce mb-12 h-[72px] w-[72px]" viewBox="0 0 20 20">
					>
					<circle fill="#FF4500" cx="10" cy="10" r="10" /><path
						fill="#FFF"
						d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"
					/></svg
				>
			</div>
		</div>
	{/if}

	{#if !$page.url.search && showUsername}
		<div class="fixed top-0 z-40 flex flex-col h-full w-full touch-none">
			<div
				transition:fade={{ duration: 1 }}
				class="fixed top-0 h-full w-full z-40 bg-black opacity-90"
			/>
			<div class="flex justify-center items-center">
				<div
					transition:slide
					class="fixed bottom-0 lg:top-[33%] flex flex-col items-center h-max w-full lg:w-max lg:px-10 lg:py-6 py-8 px-2 gap-6 bg-white z-50 rounded-t-2xl lg:rounded-2xl"
				>
					<img
						class="h-12 w-12 object-contain rounded-full bg-gray-100 px-1 py-0.5"
						src="/superhero.png"
						alt="superhero snoo"
					/>
					<p class="text-center text-sm font-medium">
						Before continuing, you must create your Reddit username.
					</p>

					<button
						on:click={() => (showUsername = false)}
						class="text-sm text-white font-bold rounded-full bg-blue-500 py-2 px-16"
						>Continue</button
					>
				</div>
			</div>
		</div>
	{/if}
</div>
