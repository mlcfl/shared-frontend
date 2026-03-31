import { $fetch } from "ofetch";
import type { FetchOptions, ResponseType } from "ofetch";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const XHR_HEADER = { "X-Requested-With": "XMLHttpRequest" } as const;

export class Api {
	static request<T = unknown, R extends ResponseType = "json">(
		url: string,
		method: Method,
		options?: FetchOptions<R>,
	): Promise<T> {
		return $fetch<T, R>(url, {
			...options,
			method,
			headers: {
				...options?.headers,
				...XHR_HEADER,
			},
		}) as Promise<T>;
	}

	static get<T = unknown>(url: string, options?: FetchOptions<"json">): Promise<T> {
		return Api.request<T>(url, "GET", options);
	}

	static post<T = unknown>(url: string, options?: FetchOptions<"json">): Promise<T> {
		return Api.request<T>(url, "POST", options);
	}

	static put<T = unknown>(url: string, options?: FetchOptions<"json">): Promise<T> {
		return Api.request<T>(url, "PUT", options);
	}

	static patch<T = unknown>(url: string, options?: FetchOptions<"json">): Promise<T> {
		return Api.request<T>(url, "PATCH", options);
	}

	static delete<T = unknown>(url: string, options?: FetchOptions<"json">): Promise<T> {
		return Api.request<T>(url, "DELETE", options);
	}
}
