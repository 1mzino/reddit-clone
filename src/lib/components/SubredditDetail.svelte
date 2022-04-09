<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let tabs;
	const handleTabSwitch = (e) => {
		dispatch('handleTabSwitch', e);
	};

	let isTextClamped = true;
	const handleClamp = () => {
		isTextClamped = false;
	};
</script>

<div class=" border-b-[1px] bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
	<div
		class="flex flex-col lg:flex-row items-center gap-2 px-2 md:px-6 lg:px-60  lg:mb-2 -mt-8 lg:-mt-4"
	>
		<div
			class="rounded-full p-1 md:p-1.5 bg-white lg:border-4 border-[1px] border-gray-100 lg:border-white"
		>
			<!-- subreddit logo -->
			<svg class="h-[64px] w-[64px]" viewBox="0 0 98.1 118">
				<style type="text/css">
					.st0 {
						fill: #ff3e00;
					}
					.st1 {
						fill: #ffffff;
					}
				</style>
				<path
					class="st0"
					d="M91.8,15.6C80.9-0.1,59.2-4.7,43.6,5.2L16.1,22.8C8.6,27.5,3.4,35.2,1.9,43.9c-1.3,7.3-0.2,14.8,3.3,21.3  c-2.4,3.6-4,7.6-4.7,11.8c-1.6,8.9,0.5,18.1,5.7,25.4c11,15.7,32.6,20.3,48.2,10.4l27.5-17.5c7.5-4.7,12.7-12.4,14.2-21.1  c1.3-7.3,0.2-14.8-3.3-21.3c2.4-3.6,4-7.6,4.7-11.8C99.2,32.1,97.1,22.9,91.8,15.6"
				/>
				<path
					class="st1"
					d="M40.9,103.9c-8.9,2.3-18.2-1.2-23.4-8.7c-3.2-4.4-4.4-9.9-3.5-15.3c0.2-0.9,0.4-1.7,0.6-2.6l0.5-1.6l1.4,1  c3.3,2.4,6.9,4.2,10.8,5.4l1,0.3l-0.1,1c-0.1,1.4,0.3,2.9,1.1,4.1c1.6,2.3,4.4,3.4,7.1,2.7c0.6-0.2,1.2-0.4,1.7-0.7L65.5,72  c1.4-0.9,2.3-2.2,2.6-3.8c0.3-1.6-0.1-3.3-1-4.6c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7l-10.5,6.7  c-1.7,1.1-3.6,1.9-5.6,2.4c-8.9,2.3-18.2-1.2-23.4-8.7c-3.1-4.4-4.4-9.9-3.4-15.3c0.9-5.2,4.1-9.9,8.6-12.7l27.5-17.5  c1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.2,0.9-0.4,1.7-0.7,2.6l-0.5,1.6l-1.4-1  c-3.3-2.4-6.9-4.2-10.8-5.4l-1-0.3l0.1-1c0.1-1.4-0.3-2.9-1.1-4.1c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7L32.4,46.1  c-1.4,0.9-2.3,2.2-2.6,3.8s0.1,3.3,1,4.6c1.6,2.3,4.4,3.3,7.1,2.6c0.6-0.2,1.2-0.4,1.7-0.7l10.5-6.7c1.7-1.1,3.6-1.9,5.6-2.5  c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.9,5.2-4.1,9.9-8.6,12.7l-27.5,17.5C44.8,102.5,42.9,103.3,40.9,103.9"
				/>
			</svg>
		</div>

		<div
			class="flex flex-col items-center lg:items-start space-y-2 lg:space-y-1 md:mt-4 px-4 text-sm text-zinc-400 dark:text-zinc-300"
		>
			<h1
				class="text-xl text-center md:text-[28px] whitespace-nowrap text-black dark:text-gray-100 font-bold"
			>
				Svelte the JavaScript Non-Framework
			</h1>
			<p class="font-medium">r/sveltejs</p>

			<!-- ABOUT SUBREDDIT COMPONENT -->
			<div class="lg:hidden space-y-2 flex flex-col items-center md:px-8">
				<div class="inline-flex justify-center items-end space-x-1">
					<p class={`text-center ${isTextClamped ? 'line-clamp-2' : 'line-clamp-none'}`}>
						Svelte is a radical new approach to building user interfaces. Whereas traditional
						frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts
						that work into a compile step that happens when you build your app. Instead of using
						techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM
						when the state of your app changes
					</p>

					{#if isTextClamped}
						<button on:click={handleClamp} class="text-blue-600">More</button>
					{/if}
				</div>

				<span class="flex text-black dark:text-gray-100">
					<p><strong>13.5k</strong> members</p>
					<p><span class="text-xs mx-2">•</span><strong>24</strong> online</p>
				</span>
			</div>
		</div>
		<!-- join subreddit button -->
		<!-- <button
				class="cursor-pointer mt-3 mb-1 lg:-mt-1 lg:mb-0 py-1 lg:py-0.5 px-8 lg:px-6 bg-white  border-[1px] border-blue-600 lg:border-redditOrange text-blue-600 lg:text-redditOrange font-semibold rounded-full"
			>
				Joined
			</button> -->

		<!-- tabs -->
		<div class="lg:hidden px-4 mt-2 md:px-8 w-full flex flex-row justify-center ">
			<button
				on:click={() => handleTabSwitch('POSTS')}
				class={`w-[50%] pb-2 border-b-2 text-sm font-semibold 
					${
						tabs === 'POSTS'
							? 'text-blue-600 dark:text-blue-500 border-blue-600'
							: 'text-gray-400 border-transparent'
					} `}
			>
				POSTS
			</button>
			<button
				on:click={() => handleTabSwitch('ABOUT')}
				class={`w-[50%] pb-2 border-b-2 text-sm font-semibold
					${
						tabs === 'ABOUT'
							? 'text-blue-600 dark:text-blue-500 border-blue-600'
							: 'text-gray-400 border-transparent'
					}`}
			>
				ABOUT
			</button>
		</div>
	</div>
</div>
