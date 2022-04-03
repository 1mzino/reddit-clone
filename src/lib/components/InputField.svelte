<script>
	export let name;
	export let disabled;
	export let placeholder;
	export let type;
	export let errors;
	export let value;
</script>

<div class="space-y-2 lg:space-y-1">
	<div class="relative flex items-center">
		<input
			{name}
			{disabled}
			{placeholder}
			{type}
			{value}
			on:change
			class={`rounded-full lg:rounded-sm w-full px-4 py-2 lg:text-sm bg-gray-100  lg:border-[1px] border-gray-200 ${
				disabled
					? 'lg:bg-yellow-100 placeholder:text-black'
					: 'lg:bg-white placeholder:text-gray-600'
			}`}
		/>
		{#if errors}
			<p class="absolute right-6 lg:right-4 text-md text-red-500 font-medium">!</p>
		{/if}
	</div>
	{#if errors}
		<p class="text-xs text-red-500 px-4 lg:px-0 font-medium">{errors}</p>
	{/if}
</div>
