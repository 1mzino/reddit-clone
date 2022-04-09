import { withDefault } from './internal.js';

export const userMapper = ({ username, karma }) => ({
	username: withDefault(username, null),
	karma: withDefault(karma, 0)
});

export const userToDBMapper = (user) => ({
	username: withDefault(user.username)
});

export const usersMapper = (users) => users.map((u) => userMapper(u));

export const loggedInUserMapper = (user) => ({
	last_sign_in_at: user.last_sign_in_at,
	authenticated: user.aud === 'authenticated',
	email: user.email,
	id: user.id
});

export const combinedUserMapper = (user) => ({
	...loggedInUserMapper(user),
	...userMapper(user)
});
