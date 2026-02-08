import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para una zona protegida
export interface Zona {
  id: number;
  nombre: string;
  ubicacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ZonaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/zonas/get-zonas';

  constructor() { }

  // Obtiene la lista de todas las zonas protegidas
  getZonas(): Observable<Zona[]> {
    return this.http.get<Zona[]>(this.apiUrl);
  }
}