// lib/http/client.ts - client-side hooks
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import useSWRMutation, { SWRMutationConfiguration, SWRMutationResponse } from 'swr/mutation';
import { toast } from 'sonner';
import { fetchAPI, FetchOptions, ApiError } from './fetch';

// common request options
export interface RequestOptions {
  headers?: HeadersInit;
  showErrorToast?: boolean;
}

// GET request options
export interface GetOptions extends RequestOptions {
  config?: SWRConfiguration;
}

// mutation request options
export interface MutationOptions<Data = unknown> extends RequestOptions {
  method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: Data;
}

// extended SWRMutationConfiguration type
export interface ExtendedMutationConfiguration<Data = unknown, Error = unknown, SWRKey extends string = string, Args = unknown>
  extends SWRMutationConfiguration<Data, Error, SWRKey, Args> {
  showErrorToast?: boolean;
}

// base fetcher function
const defaultFetcher = async <T>(url: string, options?: FetchOptions): Promise<T> => {
  return fetchAPI<T>(url, options);
};

// GET hook - for data fetching
export function useQuery<T>(url: string | null | undefined, options: GetOptions = {}): SWRResponse<T, ApiError> {
  const { config, showErrorToast = false } = options;

  return useSWR<T, ApiError>(url, defaultFetcher, {
    revalidateOnFocus: false,
    ...config,
    onError: (error, key, config) => {
      if (showErrorToast) {
        toast.error(error.message);
      }

      if (config?.onError) {
        config.onError(error, key, config);
      }
    },
  });
}

// create type-safe request function
async function requestFetcher<T, D>(url: string, { arg }: { arg: MutationOptions<D> }): Promise<T> {
  const { method = 'POST', body, headers = {} } = arg;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw new ApiError(`Request failed: ${res.status}`, res.status);
    }

    return res.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error instanceof Error ? error.message : 'Unknown error', 500);
  }
}

// POST/PUT/DELETE/PATCH hook - for data mutations
export function useMutation<T, D = unknown>(
  url: string,
  options: ExtendedMutationConfiguration<T, ApiError, string, MutationOptions<D>> = {}
): SWRMutationResponse<T, ApiError, string, MutationOptions<D>> {
  const { onError, showErrorToast = false, ...restOptions } = options;

  return useSWRMutation<T, ApiError, string, MutationOptions<D>>(url, requestFetcher, {
    ...restOptions,
    onError: (error, key, config) => {
      if (showErrorToast) {
        toast.error(error.message);
      }

      if (onError) {
        onError(error, key, config);
      }
    },
  });
}

// custom hook - simplify using specific API endpoints
export function createApiHook<ResponseType, RequestBodyType = unknown>(baseUrl: string) {
  function useApiQuery(endpoint?: string | null, options: GetOptions = {}) {
    const url = endpoint === null || endpoint === undefined ? null : `${baseUrl}${endpoint}`;
    return useQuery<ResponseType>(url, options);
  }

  function useApiMutation(endpoint: string, options: ExtendedMutationConfiguration<ResponseType, ApiError, string, MutationOptions<RequestBodyType>> = {}) {
    const url = `${baseUrl}${endpoint}`;
    return useMutation<ResponseType, RequestBodyType>(url, options);
  }

  return {
    useApiQuery,
    useApiMutation,
  };
}

// create client API helper function
export function createApiClient(baseUrl: string = '/api') {
  return {
    createResourceApi: <ResponseType, RequestBodyType = unknown>(resourcePath: string) => {
      const resourceUrl = `${baseUrl}${resourcePath}`;
      return createApiHook<ResponseType, RequestBodyType>(resourceUrl);
    },
  };
}
