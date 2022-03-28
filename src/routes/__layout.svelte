<script>
	import supabase from '$lib/supabase';
	import { session } from '$app/stores';

	// import { getProfileById } from '$lib/data/queries/users/getProfile';

	// import { profile } from '$lib/store/profileStore';

	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import CreateUsername from '$lib/components/CreateUsername.svelte';
	import { user } from '$lib/store/authStore';
	import { profile } from '$lib/store/profileStore';

	export const loadProfile = async (userId) => {
		let { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
		return data;
	};

	let isMenuOpen = false;

	// toggle show menu
	const handleMenuClick = () => {
		isMenuOpen = !isMenuOpen;
	};

	const handleCloseMenu = () => {
		isMenuOpen = false;
	};

	console.log($session);
</script>

<div class="flex flex-col min-h-screen w-screen touch-manipulation">
	<Navbar {handleMenuClick} {handleCloseMenu} {isMenuOpen} />

	<!-- children -->
	<slot />

	<!-- <CreateUsername /> -->
	<!-- {#if userSession?.user && !userSession?.profile?.username}
		<p>SET USERNAME</p>
	{/if} -->
	<!-- Menu as 'portal' -->
	<Menu {handleMenuClick} {isMenuOpen} />
</div>
