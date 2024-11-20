import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { get } from 'svelte/store';

export const apiGet = async <T>(endpoint: string): Promise<T> => {
	const requestPath = PUBLIC_API_BASE_URL + endpoint;

	const response = await fetch(requestPath, {
		method: 'GET'
	});

	const json: T = await response.json();
	return json;
};

export const apiPost = async <T>(endpoint: string, body: T): Promise<T> => {
	const requestPath = PUBLIC_API_BASE_URL + endpoint;

	const response = await fetch(requestPath, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	const json: T = await response.json();
	return json;
};

export const apiPut = async <T>(endpoint: string, body: T): Promise<T> => {
	const requestPath = PUBLIC_API_BASE_URL + endpoint;

	const response = await fetch(requestPath, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	const json: T = await response.json();
	return json;
};

export const apiDelete = async (endpoint: string): Promise<void> => {
	const requestPath = PUBLIC_API_BASE_URL + endpoint;
	await fetch(requestPath, {
		method: 'DELETE'
	});
};