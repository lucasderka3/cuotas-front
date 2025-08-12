import ClientesRepository from "~/core/repositories/ClientesRepository";
import PlanesRepository from "~/core/repositories/PlanesRepository";


export interface AppRepositories{
    clientes: ClientesRepository;
    planes: PlanesRepository;
}

let instancia: AppRepositories = null;

const initialize = (): AppRepositories => ({
    clientes: new ClientesRepository(),
    planes: new PlanesRepository(),
})

export default () => {
    if(instancia === null){
        instancia = initialize();
    }
    return instancia;
}