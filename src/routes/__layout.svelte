<script context="module">
	export async function load({ session }) {
		return {
			props: {
				theme: session.theme
			}
		};
	}
</script>

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

	import { setTheme } from '$lib/store/theme';
	import UsernameForm from '$lib/components/UsernameForm.svelte';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';

	export let theme;
	console.log(theme);
	console.log($session);

	let authState = $page.url.search ? 'SIGN-IN' : 'SIGN-UP';

	let showAuthModal = $page.url.search ? true : false;
	let showLoading = $page.url.search ? true : false;
	let showMenu = false;
	let showUsername = false;

	const toggleAuthModal = (e) => {
		if (e.detail === 'CLOSE') {
			return (showAuthModal = false);
		}

		authState = e.detail;
		showAuthModal = true;
	};

	const toggleMenu = (e) => {
		if (e.detail === 'CLOSE') {
			return (showMenu = false);
		}

		showMenu = !showMenu;
	};

	const toggleDarkMode = () => {
		const nextTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(nextTheme);
	};

	// set supabase cookie on event
	supabase.auth.onAuthStateChange(async (event, _session) => {
		console.log(_session);
		if (event === 'SIGNED_OUT') {
			// @ts-ignore
			session.set({ user: combinedUserMapper({}), theme });
			await unsetAuthCookie();
		}
		if (event === 'SIGNED_IN') {
			const sessionUser = _session.user;
			const profile = await getProfileById(sessionUser?.id);
			const user = combinedUserMapper({ ...sessionUser, ...profile });

			// @ts-ignore
			session.set({ user, theme });
			// session.update((current) => {
			// 	return { ...current, user };
			// });
			await setAuthCookie(_session);
		}
	});

	onMount(async () => {
		// after oauth redirects and set session,
		if ($page.url.search === '?oauth') {
			return setTimeout(() => (window.location.href = 'http://localhost:3000/'), 1500);
		}

		if ($session.user.authenticated && !$session.user.username) {
			showUsername = true;
			return;
		}
	});
</script>

<div class={`${theme} flex flex-col min-h-screen w-screen bg-white touch-manipulation`}>
	<Navbar
		on:toggleDarkMode={toggleDarkMode}
		on:openModal={toggleAuthModal}
		on:handleMenuClick={toggleMenu}
		{showMenu}
		{showLoading}
	/>

	<!-- Current page -->
	<slot />

	<!-- Menu as 'portal' -->
	<Menu on:handleMenuClick={toggleMenu} {showMenu} />

	<!-- Desktop Auth (Mobile Auth uses Auth Routes) -->
	{#if showAuthModal}
		<Modal {authState} on:handleAuthState={toggleAuthModal} on:closeModal={toggleAuthModal} />
	{/if}

	<!-- Mobile oauth loading -->
	{#if showLoading}
		<LoadingScreen />
	{/if}

	<!-- Create Profile -->
	{#if showUsername}
		<UsernameForm
			on:closeModal={async () => {
				const profile = await getProfileById($session.user.id);
				const sessionUser = $session.user;

				let user = { ...sessionUser, username: profile.username };
				session.update((current) => {
					return { ...current, user };
				});

				showUsername = false;
			}}
		/>
	{/if}
</div>
