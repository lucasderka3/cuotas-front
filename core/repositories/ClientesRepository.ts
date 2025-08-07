import {RepositoryBase} from "~/core/repositories/RepositoryBase";
import {useFetchStatic} from "~/Composables/http/useFetchStatic";
import {Cliente} from "~/core/types/Cliente";


export default class ClientesRepository extends RepositoryBase{
    index(){
        return useFetchStatic('/api/v1/clientes')
    }

    getClienteById(id: number){
        return useFetchStatic(`/api/v1/clientes/${id}`)
    }

    getCuotas(id: number){
        return useFetchStatic(`/api/v1/clientes/${id}/cuotas`)
    }

    newCliente(cliente: Cliente){
        return useFetchStatic(`/api/v1/clientes`, {
            method: 'POST',
            body: JSON.stringify(cliente),
        })
    }


}