import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../../models/user-response.model';
import { AnimalResponse } from '../../models/animal-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080';
  private baseUrl = `${this.apiUrl}/api/users/profile`;

  constructor(private http: HttpClient) { }

  // Obtiene el perfil del usuario
  getUserProfile(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.baseUrl);
  }

  // Actualiza el nombre del usuario
  updateUserProfile(data: { nombre: string }): Observable<UserResponse> {
    return this.http.put<UserResponse>(this.baseUrl, data);
  }

  // Sube la imagen de perfil
  uploadProfileImage(file: File): Observable<UserResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UserResponse>(`${this.baseUrl}/image`, formData);
  }

  // Obtiene la lista de favoritos
  getFavorites(): Observable<AnimalResponse[]> {
    return this.http.get<AnimalResponse[]>(`${this.baseUrl}/favorites`);
  }

  // Agrega un animal a favoritos
  addFavorite(animalId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/favorites/${animalId}`, {});
  }

  // Elimina un animal de favoritos
  removeFavorite(animalId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/favorites/${animalId}`);
  }
}