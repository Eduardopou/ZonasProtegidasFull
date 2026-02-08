import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvestigacionResponse } from '../../../models/investigacion-response.model';

export interface ResearchPayload {
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

@Injectable({
  providedIn: 'root'
})
export class ResearchManagementService {
  private baseUrl = 'http://localhost:8080/investigaciones';

  constructor(private http: HttpClient) {}

  // Devuelve todas las investigaciones
  getInvestigaciones(): Observable<InvestigacionResponse[]> {
    return this.http.get<InvestigacionResponse[]>(`${this.baseUrl}/admin`);
  }

  // Crea una nueva investigación
  createInvestigacion(payload: ResearchPayload): Observable<InvestigacionResponse> {
    return this.http.post<InvestigacionResponse>(`${this.baseUrl}/admin`, payload);
  }

  // Actualiza una investigación existente
  updateInvestigacion(id: number, payload: ResearchPayload): Observable<InvestigacionResponse> {
    return this.http.put<InvestigacionResponse>(`${this.baseUrl}/admin/${id}`, payload);
  }

  // Elimina una investigación
  deleteInvestigacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/${id}`);
  }

  // Marca una investigación como completada
  markCompleted(id: number): Observable<InvestigacionResponse> {
    return this.http.patch<InvestigacionResponse>(`${this.baseUrl}/admin/${id}/complete`, {});
  }
}

