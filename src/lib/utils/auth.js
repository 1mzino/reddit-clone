import supabase from '$lib/supabase';
import { successMapper, errorMapper } from '$lib/mappers/internal';

export const signUp = async (email, password, username) => {
	const { error } = await supabase.auth.signUp(
		{
			email,
			password
		},
		{
			data: {
				username
			}
		}
	);
	if (!error) {
		return successMapper({
			message: 'Signup successfully.'
		});
	}

	if (error.message === 'Database error saving new user') {
		return errorMapper({
			message: 'Username is taken',
			code: 400
		});
	}

	return errorMapper({
		message: error.message,
		code: 400
	});
};

export const signIn = async (email, password) => {
	const { error } = await supabase.auth.signIn({ email, password });

	if (!error) {
		return successMapper({
			message: `You've successfully logged in`
		});
	}

	return errorMapper({
		message: error.message,
		code: 400
	});
};

export const signOut = async () => {
	const { error } = await supabase.auth.signOut();

	if (!error) {
		return successMapper({
			message: 'Signed out succesfully.'
		});
	}

	return errorMapper({
		message: error.message,
		code: 400
	});
};

export const googleAuth = async () => {
	const { error } = await supabase.auth.signIn(
		{ provider: 'google' },
		{ redirectTo: 'http://localhost:3000/?oauth' }
	);

	if (!error) {
		return successMapper({
			message: 'Signed in via Third Party Provider successfully.'
		});
	}

	return errorMapper({
		message: error.message,
		code: 400
	});
};
