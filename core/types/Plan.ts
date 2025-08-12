export interface Plan {
    id?: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    frecuencia_pago: string;
    activo?: boolean;
}