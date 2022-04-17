import { errorMapper, successMapper } from '$lib/mappers/internal';

import supabase from '$lib/supabase';

export const getProfile = async () => {
	const { data } = await supabase.from('profiles').select('*').single();
	return data;
};

export const getProfileById = async (userId) => {
	const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
	return data;
};

export const updateProfileUsername = async (userId, username) => {
	const { error } = await supabase.from('profiles').update({ username }).eq('id', userId);

	if (!error) {
		return successMapper({
			message: 'Updated username successfully.'
		});
	}

	return errorMapper({
		message: error.message,
		code: 400
	});
};
