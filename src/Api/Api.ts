import { $fetch, type FetchOptions, type ResponseType } from "ofetch";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type ApiOptions<R extends ResponseType = "json"> = FetchOptions<R> & {
	// If true, the API will attempt to refresh the token on 401/403 errors and retry the request once
	shouldRefresh?: boolean;
};

const XHR_HEADER = { "X-Requested-With": "XMLHttpRequest" } as const;

export class Api {
	private static authApiBase: string = "";

	static configure(options: { authApiBase: string }): void {
		this.authApiBase = options.authApiBase;
	}

	static request<T = unknown, R extends ResponseType = "json">(
		url: string,
		method: Method,
		options?: ApiOptions<R>,
	): Promise<T> {
		const { shouldRefresh = true, ...fetchOptions } = options ?? {};

		const doFetch = (): Promise<T> =>
			$fetch<T, R>(url, {
				...fetchOptions,
				method,
				headers: { ...fetchOptions.headers, ...XHR_HEADER },
			}) as Promise<T>;

		if (!shouldRefresh) {
			return doFetch();
		}

		return doFetch().catch(async (error: unknown) => {
			const status = (error as { response?: { status?: number } })?.response
				?.status;

			if (status === 401) {
				await Api.refreshToken();
				return doFetch();
			}

			throw error;
		});
	}

	static get<T = unknown>(url: string, options?: ApiOptions): Promise<T> {
		return this.request<T>(url, "GET", options);
	}

	static post<T = unknown>(url: string, options?: ApiOptions): Promise<T> {
		return this.request<T>(url, "POST", options);
	}

	static put<T = unknown>(url: string, options?: ApiOptions): Promise<T> {
		return this.request<T>(url, "PUT", options);
	}

	static patch<T = unknown>(url: string, options?: ApiOptions): Promise<T> {
		return this.request<T>(url, "PATCH", options);
	}

	static delete<T = unknown>(url: string, options?: ApiOptions): Promise<T> {
		return this.request<T>(url, "DELETE", options);
	}

	private static async refreshToken(): Promise<void> {
		await $fetch(`${this.authApiBase}/api/refresh-token`, {
			method: "POST",
			headers: XHR_HEADER,
		});
	}
}
