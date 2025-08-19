import {Pago} from "~/core/types/Pago";
import useRepositories from "~/Composables/useRepositories";


export const usePagosStore = defineStore('pagos', () => {
    const loading = ref(false);
    const error = ref<string | null>(null);
    const success = ref(false);


    const crearPago = async (pago: Pago) => {
        loading.value = true;

        try{
            const {data, error: fetchError } = await useRepositories().pagos.newPago(pago)

            if(fetchError.value) {
                if(fetchError.value.status === 400) {
                    error.value = fetchError.value.data?.message || 'Error al hacer el pago';
                }
                return null;
            }

            success.value = true;
            return data.value;
        }catch(err: any){
            error.value = err?.data?.message || 'Error inesperado al hacer el pago';
            return null
        }finally {
            loading.value = false;
        }
    }


    return{
        loading,
        error,
        success,
        crearPago,
    }

})