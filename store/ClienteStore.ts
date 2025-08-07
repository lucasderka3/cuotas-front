import {Cliente} from '~/core/types/Cliente'
import useRepositories from "~/Composables/useRepositories";
import {Cuota} from "~/core/types/Cuota";

export const useClientesStore = defineStore('clientes', () => {
    const clientes = ref<Cliente[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const success = ref(false);
    const cuotasCliente = ref<Cuota[]>([]);
    const clienteSeleccionado = ref<Cliente | null>(null);

    const fetchClientes = async () => {
        loading.value = true
        error.value = null

        try {
            const { data, error: fetchError } = await useRepositories().clientes.index()

            if (fetchError.value) {
                throw new Error(fetchError.value.message || 'Error al obtener clientes')
            }

            clientes.value = data.value || []
        } catch (err: any) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }



    const fetchCuotasByCliente = async (clienteId: number) => {
        try{
            const {data: cuotasData} = await useRepositories().clientes.getCuotas(clienteId);
            const { data: clienteData } = await useRepositories().clientes.getClienteById(clienteId);

            clienteSeleccionado.value = clienteData.value;
            cuotasCliente.value = cuotasData.value
        }catch(err){

        }
    }

    const crearCliente = async(cliente: Cliente) => {
         loading.value = true;
         error.value = null
         success.value = false
        try {
            const res = await useRepositories().clientes.newCliente(cliente);
            success.value = true;
            return res;
        }catch(err){
            error.value = err?.data?.message || 'Error crear el cliente';
        } finally {
             loading.value = false
        }
    }

    return {
        clientes,
        cuotasCliente,
        clienteSeleccionado,
        loading,
        error,
        success,
        fetchClientes,
        fetchCuotasByCliente,
        crearCliente,
    }
})