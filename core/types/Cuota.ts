import {Cliente} from "~/core/types/Cliente";
import {Plan} from "~/core/types/Plan";

export interface Cuota{
    id?: number
    cliente?: Cliente;
    plan?: Plan;
    clienteId: number;
    planId: number;
    fechaInicio: string;
    fechaFin: string;
    monto: number;
    pagada?: boolean;
    fechaPago?: string | null;
    observaciones?: string;
}