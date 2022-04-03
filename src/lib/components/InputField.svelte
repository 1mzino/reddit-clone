<script>
	export let value;
	export let name;
	export let disabled;
	export let placeholder;
	export let errors;
</script>

<div class="space-y-2 lg:space-y-1">
	<div class="relative flex items-center">
		<input
			{name}
			{disabled}
			{placeholder}
			on:change
			bind:value
			class={`rounded-full lg:rounded-sm w-full px-4 py-2 lg:text-sm bg-gray-100  lg:border-[1px] border-gray-200 ${
				disabled
					? 'lg:bg-yellow-100 placeholder:text-black'
					: 'lg:bg-white placeholder:text-gray-600'
			}`}
			type="text"
		/>
		{#if errors}
			<p class="absolute right-6 lg:right-4 text-md text-red-500 font-medium">!</p>
		{/if}
	</div>
	{#if errors}
		<p class="text-xs text-red-500 px-4 lg:px-0 font-medium">{errors}</p>
	{/if}
</div>
