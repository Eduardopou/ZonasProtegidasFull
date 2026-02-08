export interface Actividad {
  id: number;
  titulo: string;
  descripcion: string;
  imagenUrl: string; 
  dificultad: 'BAJA' | 'MEDIA' | 'ALTA' | 'EXTREMA';
  duracion: string; 
  requiereGuia: boolean; 
  costo: number; 
  horario?: string; 
}