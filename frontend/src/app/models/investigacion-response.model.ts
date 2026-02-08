export interface InvestigacionResponse {
    id: number;
    titulo: string;
    institucion: string;
    investigadorPrincipal: string;
    fechaInicio: string;
    estado: string;
    resumen: string;
    permisosGobierno: string; 
    progreso: number;
    zonaProtegidaNombre: string; 
}