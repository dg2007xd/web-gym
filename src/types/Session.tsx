import { SessionDetalle } from "./SessionDetalle";

export interface Session {
    idsesion: number;
    fechasesion: string;
    nombre_cliente: string;
    edad_cliente: number;
    nombre_entrenador: string;
    especialidad_entrenador: string;
    experiencia_entrenador: string;
    detalle: SessionDetalle[];
}