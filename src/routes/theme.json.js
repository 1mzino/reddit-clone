export async function put({ request }) {
	const theme = await request.json();

	return {
		headers: {
			'set-cookie': [`theme=${theme}; Path=/; SameSite=Strict; HttpOnly; Secure`]
		}
	};
}
