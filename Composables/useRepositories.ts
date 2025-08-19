import ClientesRepository from "~/core/repositories/ClientesRepository";
import PlanesRepository from "~/core/repositories/PlanesRepository";
import CuotasRepository from "~/core/repositories/CuotasRepository";
import PagosRepository from "~/core/repositories/PagosRepository";


export interface AppRepositories{
    clientes: ClientesRepository;
    planes: PlanesRepository;
    cuotas: CuotasRepository;
    pagos: PagosRepository;
}

let instancia: AppRepositories = null;

const initialize = (): AppRepositories => ({
    clientes: new ClientesRepository(),
    planes: new PlanesRepository(),
    cuotas: new CuotasRepository(),
    pagos: new PagosRepository(),
})

export default () => {
    if(instancia === null){
        instancia = initialize();
    }
    return instancia;
}