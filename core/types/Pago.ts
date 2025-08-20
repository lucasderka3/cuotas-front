import {Cuota} from "~/core/types/Cuota";
import {Cliente} from "~/core/types/Cliente";

export interface Pago{
    cuotaId: number;
    metodoPago: string;
    observaciones?: string;
}

export interface FetchPago{
    id: number;
    cliente: Cliente;
    fecha: string;
    monto: string;
    metodoPago: string;
    observaciones: string;
}