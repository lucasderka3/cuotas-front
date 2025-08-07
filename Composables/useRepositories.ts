import ClientesRepository from "~/core/repositories/ClientesRepository";


export interface AppRepositories{
    clientes: ClientesRepository;
}

let instancia: AppRepositories = null;

const initialize = (): AppRepositories => ({
    clientes: new ClientesRepository(),
})

export default () => {
    if(instancia === null){
        instancia = initialize();
    }
    return instancia;
}