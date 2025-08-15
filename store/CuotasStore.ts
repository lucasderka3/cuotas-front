import {Cuota} from "~/core/types/Cuota";
import useRepositories from "~/Composables/useRepositories";


export const useCuotasStore = defineStore('cuotas', () => {
    const loading = ref(false);
    const error = ref<string | null>(null);
    const success = ref(false);


    const crearCuota = async (cuota: Cuota) => {
        loading.value = true;
        error.value = null;
        success.value = false;

        try {
            const {data, error: fetchError } = await useRepositories().cuotas.newCuota(cuota);

            if(fetchError.value) {
                if(fetchError.value.status === 400) {
                    error.value = fetchError.value.data?.message || 'Error al crear la cuota';
                }
                return null;
            }

            success.value = true;
            return data.value;
        }catch (err: any) {
            error.value = err?.data?.message || 'Error inesperado al crear la cuota';
            return null
        }finally {
            loading.value = false;
        }

    }


    return{
        loading,
        error,
        success,
        crearCuota,
    }




})