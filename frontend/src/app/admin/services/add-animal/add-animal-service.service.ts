
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { AnimalResponse } from '../../../models/animal-response.model';

export interface ZonaProtegida {
  id: number;
  nombre: string;
  ubicacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'http://localhost:8080/animal';
  private zonasApiUrl = 'http://localhost:8080/zonas';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getZonas(): Observable<ZonaProtegida[]> {
    return this.http.get<ZonaProtegida[]>(`${this.zonasApiUrl}/get-zonas`);
  }

  //Obtener todos los animales
  getAllAnimals(): Observable<AnimalResponse[]> {
    return this.http.get<AnimalResponse[]>(`${this.apiUrl}/get-animals`);
  }

  //Modificar animal
  updateAnimal(id: number, formValue: any, currentImage?: File | null): Observable<any> {
    const animalData = {
      name: formValue.common_name,  
      scientificName: formValue.scientific_name, 
      extinction: formValue.danger_extinction,
      zonaProtegidaId: Number(formValue.area) 
    };

    const formData = new FormData();

    if (currentImage) {
      formData.append('file', currentImage);
    }

    formData.append('animalData', JSON.stringify(animalData));

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.apiUrl}/update/${id}`, formData, { headers });
  }

  addAnimal(formValue: any): Observable<any> {
    
     const animalData = {
      name: formValue.name,
      scientificName: formValue.scientificName,
      extinction: formValue.extinction,
      zonaProtegidaId: Number(formValue.zonaProtegidaId)
    };
    const formData = new FormData();
    formData.append('file', formValue.file as File);
    formData.append('animalData', JSON.stringify(animalData));
    const token = this.authService.getToken();
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post(`${this.apiUrl}/add-animal`, formData, { headers });
  }
}