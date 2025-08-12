import {Plan} from "~/core/types/Plan";
import useRepositories from "~/Composables/useRepositories";


export const usePlanesStore = defineStore('planes', () => {
    const planes = ref<Plan[]>([])
    const loading = ref(false);
    const error = ref<string | null>(null);
    const success = ref(false);


    const fetchPlanes = async () => {
        loading.value = true;
        error.value = null;

        try {
            const { data, error: fetchError} = await useRepositories().planes.index();

            if(fetchError.value) {
                throw new Error(fetchError.value.message || "Error al obtener los planes");
            }

            planes.value = data.value || [];
        }catch (err: any) {
            error.value = err.message;
        }finally {
            loading.value = false;
        }
    }


    const crearPlan = async(plan: Plan) => {
        loading.value = true;
        error.value = null;
        success.value = false;

        try{
            const { data, error: fetchError } = await useRepositories().planes.newPlan(plan)


            if (fetchError.value) {
                error.value = fetchError.value.data?.message || 'Error al crear el plan';
                return null;
            }

            success.value = true;
            return data.value;
        }catch(err: any){
            error.value = err?.data?.message || 'Error inesperado al crear el plan'
            return null
        } finally {
            loading.value = false;
        }

    }




    return{
        loading,
        error,
        success,
        planes,
        fetchPlanes,
        crearPlan,
    }
})