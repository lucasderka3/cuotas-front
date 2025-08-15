import {RepositoryBase} from "~/core/repositories/RepositoryBase";
import {Cuota} from "~/core/types/Cuota";
import {useFetchStatic} from "~/Composables/http/useFetchStatic";


export default class CuotasRepository extends RepositoryBase{

    newCuota(cuota: Cuota) {
     return useFetchStatic(`/api/v1/cuotas`, {
         method: 'POST',
         body: JSON.stringify(cuota)
     })
    }

}