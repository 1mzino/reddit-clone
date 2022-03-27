<script>
	import { session } from '$app/stores';
	import { auth, setAuthCookie, unsetAuthCookie } from '$lib/auth';

	// import { getProfileById } from '$lib/data/queries/users/getProfile';

	// import { user } from '$lib/store/authStore';
	// import { profile } from '$lib/store/profileStore';

	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import CreateUsername from '$lib/components/CreateUsername.svelte';

	auth.onAuthStateChange(async (event, _session) => {
		if (event !== 'SIGNED_OUT') {
			await setAuthCookie(_session);
			session.set({ user: _session.user, authenticated: !!_session.user });
		} else {
			session.set({ user: undefined, authenticated: false });
			await unsetAuthCookie();
		}
	});
	let isMenuOpen = false;

	// toggle show menu
	const handleMenuClick = () => {
		isMenuOpen = !isMenuOpen;
	};

	const handleCloseMenu = () => {
		isMenuOpen = false;
	};
</script>

<div class="flex flex-col min-h-screen w-screen touch-manipulation">
	<Navbar {handleMenuClick} {handleCloseMenu} {isMenuOpen} />

	<!-- children -->
	<slot />

	<!-- <CreateUsername /> -->

	<!-- Menu as 'portal' -->
	<Menu {handleMenuClick} {isMenuOpen} />
</div>
