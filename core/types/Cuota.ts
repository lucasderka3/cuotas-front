import {Cliente} from "~/core/types/Cliente";
import {Plan} from "~/core/types/Plan";

export interface Cuota{
    id: number
    cliente: Cliente;
    plan: Plan;
    fechaInicio: string;
    fechaFin: string;
    monto: string;
    pagada: boolean;
    fechaPago: string | null;
    observaciones?: string;
}