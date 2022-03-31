<!-- <script context="module">
	export async function load({ session }) {
		if (session.user.authenticated && !session.user.username) {
			return {
				props: {}
			};
		}

		if (!session.user.authenticated || session.user.username) {
			return {
				status: 301,
				redirect: '/'
			};
		}

		return {
			props: {}
		};
	}
</script>

<script>
</script>

<div class="fixed top-[49px] w-full space-y-2 py-6 px-6">
	<h1 class="text-xl font-semibold">Enter username</h1>

	<input class="w-full border-[1px] border-gray-200 rounded-md py-1.5 px-2 " />
</div> -->
