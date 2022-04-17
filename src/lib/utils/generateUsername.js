import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export const separators = ['-', '_', ''];

export const generateUsername = () => {
	return uniqueNamesGenerator({
		dictionaries: [adjectives, colors, animals],
		separator: separators[Math.floor(Math.random() * 3)],
		length: 2
	});
};
