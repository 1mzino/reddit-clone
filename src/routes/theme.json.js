export async function put({ request }) {
	const theme = await request.json();

	return {
		headers: {
			'set-cookie': `theme=${theme}; SameSite=Strict; HttpOnly; Secure`
		}
	};
}
