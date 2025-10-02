
export interface Estadisticas {
    totalGanadoMes: string;
    cantidadClientes: number;
    planesMasUsados: PlanUso[]
}

export interface PlanUso {
    plan: string;
    usos: string;
}