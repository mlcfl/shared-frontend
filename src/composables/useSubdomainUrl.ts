import { computed } from 'vue';

/**
 * Generates a computed URL for a given subdomain and optional path.
 *
 * @param subdomain - The subdomain to use in the URL.
 * @param path - An optional path to append to the URL.
 * @returns A computed ref containing the constructed URL.
 */
export const useSubdomainUrl = (subdomain: string, path: string = "") => {
	return computed(() => {
		const { protocol, hostname, port } = window.location;
		const index = hostname.endsWith("localhost") ? -1 : -2;
		const host = hostname.split(".").slice(index).join(".");

		return `${protocol}//${subdomain}.${host}${port ? `:${port}` : ""}${path}`;
	});
};
