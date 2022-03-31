<script context="module">
	export async function load({ session }) {
		if (session.user.authenticated && !session.user.username) {
			return {
				props: {
					setUsername: true
				}
			};
		}
		return {
			props: {}
		};
	}
</script>

<script>
	export let setUsername = false;
	import supabase from '$lib/supabase';
	import { session } from '$app/stores';
	import { setAuthCookie, unsetAuthCookie } from '$lib/session';
	import { combinedUserMapper } from '$lib/mappers/users';
	import { getProfileById } from '$lib/utils/getProfile';

	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import Modal from '$lib/components/Modal.svelte';

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

	let authState;
	let showAuthModal = false;
	let isMenuOpen = false;

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
</script>

<div class="flex flex-col min-h-screen w-screen bg-white touch-manipulation">
	<Navbar on:openModal={toggleAuthModal} on:handleMenuClick={toggleMenu} {isMenuOpen} />

	<!-- children -->

	<slot />

	<!-- Menu as 'portal' -->
	<Menu on:handleMenuClick={toggleMenu} {setUsername} {isMenuOpen} />

	<!-- Desktop Auth (Mobile Auth uses Auth Routes) -->
	{#if showAuthModal && !$session.user.authenticated}
		<Modal {authState} on:closeModal={toggleAuthModal} />
	{/if}

	<!-- {#if setUsername}
		<div class="fixed top-0 z-40 flex flex-col h-full w-full touch-none">
			<div class="fixed top-0 h-full w-full z-50 bg-black opacity-90" />
			<div class="flex justify-center items-center">
				<div
					class="fixed bottom-0 lg:top-[33%] flex flex-col items-center h-max w-full lg:w-max lg:px-10 lg:py-6 py-4 px-2 gap-4 bg-white z-50 rounded-t-2xl lg:rounded-2xl"
				>
					<img
						class="h-12 w-12 object-contain rounded-full bg-gray-100 px-1 py-0.5"
						src="/superhero.png"
						alt="superhero snoo"
					/>
					<p class="text-center text-sm font-medium">
						Before continuing, you must create your Reddit username.
					</p>

					<button class="text-sm text-white font-bold rounded-full bg-blue-500 py-2 px-16"
						>Continue</button
					>
				</div>
			</div>
		</div>
	{/if} -->
</div>
