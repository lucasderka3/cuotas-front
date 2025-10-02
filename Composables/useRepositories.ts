import ClientesRepository from "~/core/repositories/ClientesRepository";
import PlanesRepository from "~/core/repositories/PlanesRepository";
import CuotasRepository from "~/core/repositories/CuotasRepository";
import PagosRepository from "~/core/repositories/PagosRepository";
import DashboardRepository from "~/core/repositories/DashboardRepository";


export interface AppRepositories{
    clientes: ClientesRepository;
    planes: PlanesRepository;
    cuotas: CuotasRepository;
    pagos: PagosRepository;
    dashboard: DashboardRepository;
}

let instancia: AppRepositories = null;

const initialize = (): AppRepositories => ({
    clientes: new ClientesRepository(),
    planes: new PlanesRepository(),
    cuotas: new CuotasRepository(),
    pagos: new PagosRepository(),
    dashboard: new DashboardRepository(),
})

export default () => {
    if(instancia === null){
        instancia = initialize();
    }
    return instancia;
}