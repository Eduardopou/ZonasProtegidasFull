export interface Reglamento {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string; 
  tipo: 'PROHIBICION' | 'OBLIGACION' | 'RECOMENDACION';
  severidad: 1 | 2 | 3; 
  sancion?: string; 
  articuloLegal?: string; 
}