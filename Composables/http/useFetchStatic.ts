import {UseFetchOptions} from "#app";
import {useAuthStore} from "~/store/authStore";
import {AppRoutes} from "~/core/AppRoutes";

/**
 * Usar useHttp en su lugar.
 * @param request
 * @param opts
 */

export const useFetchStatic = (request: any, opts: UseFetchOptions<any> = {})  => {
    const config = useRuntimeConfig()
    return useFetch(request, {
        baseURL: config.public.baseURL,
        onRequest({ request, options }) {
            // Set the request headers
            options.headers = options.headers || {}
            let customHeaders: any = {
                accept: 'application/json'
            };

            // const authStore = useAuthStore();
            // if(authStore.authenticated){
            //     customHeaders.Authorization = `Bearer ${authStore.token}`;
            // }

            options.headers = {...options.headers, ...customHeaders};
        },
        // onRequestError({ request, options, error }) {
        //     // Handle the request errors
        //
        //     // debemos detectar si fue una request abortada
        //     if(error.name != 'AbortError'){
        //         console.error('Request error:', error.name);
        //         // throw showError({statusCode: 500, message: "Error de conexión"});
        //     }
        // },
        onResponse({ request, response, options }) {
            // Process the response data
            return response._data
        },
        // onResponseError({ request, response, options }) {
        //     // Handle the response errors
        //     if (response.status === 401) {
        //         const router = useRouter();
        //         router.push(AppRoutes.LOGIN);
        //     }
        //     // throw new Error("Http Error");
        // },
        ...opts })
}