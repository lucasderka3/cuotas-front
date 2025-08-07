export interface Cliente {
    id?: number;
    nombre: string;
    apellido: string;
    email?: string;
    telefono?: string;
    fecha_alta?: string;
    activo?: boolean;
}