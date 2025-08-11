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

    const crearCliente = async (cliente: Cliente) => {
        loading.value = true
        error.value = null
        success.value = false

        try {
            const { data, error: fetchError } = await useRepositories().clientes.newCliente(cliente)

            if (fetchError.value) {
                // Si el backend devuelve error, lo procesamos aquí
                if (fetchError.value.statusCode === 400) {
                    error.value = fetchError.value.data?.message || 'Ya existe un cliente con este DNI'
                } else {
                    error.value = fetchError.value.data?.message || 'Error al crear el cliente'
                }
                return null
            }

            // Éxito real
            success.value = true
            return data.value
        } catch (err: any) {
            error.value = err?.data?.message || 'Error inesperado al crear el cliente'
            return null
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