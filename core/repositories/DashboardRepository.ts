import {RepositoryBase} from "~/core/repositories/RepositoryBase";
import {useFetchStatic} from "~/Composables/http/useFetchStatic";
import {useFetchDynamic} from "~/Composables/http/useFetchDynamic";
import {Estadisticas} from "~/core/types/Estadisticas";
import {Cuota} from "~/core/types/Cuota";



export default class DashboardRepository extends RepositoryBase{

    index(){
        return useFetchDynamic<Estadisticas>('/api/v1/dashboard/estadisticas')
    }

    getCuotasPorVencer(dias: number){
        return useFetchDynamic<Cuota>(`/api/v1/dashboard/cuotas-por-vencer/${dias}`)
    }
}