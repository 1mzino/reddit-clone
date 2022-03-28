<script>
	import { session } from '$app/stores';
	console.log('userSession', $session);
	import SubredditDetail from '$lib/components/SubredditDetail.svelte';
	import { user } from '$lib/store/authStore';

	let tabs = 'POSTS';
	const handleTabSwitch = (e) => {
		tabs = e.detail;
	};
</script>

<div class="flex flex-col">
	<!-- banner -->
	<div class="h-[80px] md:h-[140px] lg:h-[200px] bg-redditOrange" />
	<!-- subreddit detail component -->
	<SubredditDetail on:handleTabSwitch={handleTabSwitch} {tabs} />

	<!-- page -->
	<div class="bg-zinc-100 grow">
		{#if tabs == 'POSTS'}
			<p />
		{:else if tabs == 'ABOUT'}
			<p class="lg:hidden" />
		{/if}
	</div>
</div>
