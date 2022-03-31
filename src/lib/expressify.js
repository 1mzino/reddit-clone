/* eslint-disable no-unused-vars */
import * as cookie from 'cookie';

export async function toExpressRequest(req, body = {}) {
	return {
		body,
		headers: { host: req.headers.get('host') },
		cookies: cookie.parse(req.headers.get('cookie') || '')
	};
}

export function toExpressResponse(resp) {
	return {
		...resp,
		getHeader: (header) => resp.headers.get(header.toLowerCase()),
		setHeader: (header, value) => resp.headers.set(header.toLowerCase(), value),
		status: (_) => ({ json: (_) => {}, end: (_) => {} })
	};
}
