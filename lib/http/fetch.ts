// lib/http/fetch.ts - common fetch function
export interface FetchOptions {
  headers?: HeadersInit;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  cache?: RequestCache;
  revalidate?: number | false;
  tags?: string[];
  showErrorToast?: boolean;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// base fetch function - works for both server and client components
export async function fetchAPI<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const { headers = {}, method = 'GET', body, cache } = options;

  try {
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: method === 'GET' ? cache : 'no-store',
    };

    // this part will be used on server, client will ignore next property
    if (typeof window === 'undefined' && method === 'GET') {
      fetchOptions.next = { revalidate: options.revalidate, tags: options.tags };
    }

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      throw new ApiError(`Request failed: ${res.status} ${res.statusText}`, res.status);
    }

    return await res.json();
  } catch (error) {
    console.error(`Request error ${url}:`, error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(error instanceof Error ? error.message : 'Unknown error', 500);
  }
}
