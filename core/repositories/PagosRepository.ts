import {RepositoryBase} from "~/core/repositories/RepositoryBase";
import {Pago} from "~/core/types/Pago";
import {useFetchStatic} from "~/Composables/http/useFetchStatic";

export default class PagosRepository extends RepositoryBase{

    newPago(pago: Pago) {
        return useFetchStatic(`/api/v1/pagos`, {
            method: 'POST',
            body: JSON.stringify(pago),
        })
    }
}