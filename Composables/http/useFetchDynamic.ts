import type {NitroFetchOptions} from "nitropack";
import {useAuthStore} from "~/store/authStore";
import {ApiResponse} from "~/core/types/http/ApiResponse";

interface EnhancedError extends Error {
    statusText?: string;
    status?: number;
}

function myComposable<T = ApiResponse>(request: Request | string, opts?: NitroFetchOptions<string | Request>)  {
    const config = useRuntimeConfig();
    return $fetch<T>(request,{
        baseURL: config.public.baseURL as string,

        onRequest({request, options}) {
            options.headers = options.headers || {}
            let customHeaders: any = {
                accept: 'application/json'
            };

            const authStore = useAuthStore();
            if(authStore.authenticated){
                customHeaders.Authorization = `Bearer ${authStore.token}`;
            }

            options.headers = {...options.headers, ...customHeaders};
        },
        onRequestError({request, options, error}) {

            // debemos detectar si fue una request abortada
            if(error.name != 'AbortError'){
                console.error('Request error:', error.name);
                // throw showError({statusCode: 500, message: "Error de conexión"});
            }
        },
        onResponseError({ request, response, options, error }) {
            const enhancedError: EnhancedError = new Error("HTTP Response Error");
            enhancedError.name = error.name;
            enhancedError.status = response.status;
            enhancedError.statusText = response.statusText;
            throw enhancedError;
        },
        onResponse({request, response, options}) {
            return response._data;
        },
        ...opts
    })
}


export const useFetchDynamic = myComposable;