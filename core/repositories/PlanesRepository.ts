import {RepositoryBase} from "~/core/repositories/RepositoryBase";
import {Plan} from "~/core/types/Plan";
import {useFetchStatic} from "~/Composables/http/useFetchStatic";



export default class PlanesRepository extends RepositoryBase{

    index(){
        return useFetchStatic('/api/v1/planes')
    }

    newPlan(plan: Plan){
        return useFetchStatic('/api/v1/planes', {
            method: "POST",
            body: plan
        })
    }

    updatePlan(id:number, plan: Plan){
        return useFetchStatic('/api/v1/planes/'+id,{
            method: "PATCH",
            body: plan
        })
    }
}