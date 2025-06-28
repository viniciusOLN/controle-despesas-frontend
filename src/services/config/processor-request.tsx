import type { ResponseBase } from "./base-response";

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

export async function processRequest<T>(
  URL_Base: string,
  endpoint: string,
  options?: RequestOptions
): Promise<ResponseBase<T>> {
  try {
    const url = `${URL_Base}${endpoint}`;
    const fetchOptions: RequestInit = {
      method: options?.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    };

    if (options?.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      return {
        success: false,
        data: null as any,      
      };
    }

    const data = (await res.json()) as ResponseBase<T>;
    return data;
  } catch (error) {
    return {
      success: false,
      data: null as any,      
    };
  }
}
