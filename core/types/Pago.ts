import {Cuota} from "~/core/types/Cuota";

export interface Pago{
    cuotaId: number;
    metodoPago: string;
    observaciones?: string;
}