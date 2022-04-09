import { handleAuth } from '$lib/handleAuth';

export const handle = async ({ event, resolve }) => handleAuth({ event, resolve });

export async function getSession(event) {
	const { user, theme } = event.locals;

	return {
		user,
		theme
	};
}
