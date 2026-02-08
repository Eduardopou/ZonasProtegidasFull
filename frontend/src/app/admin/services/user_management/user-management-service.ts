import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../models/user-response.model';
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private apiUrl = 'http://localhost:8080/admin'; 

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  
   //Devuelve todos los usuarios registrados.
   //El AuthInterceptor añade el token automáticamente.
   
  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.apiUrl}/get-users`);
  }

 //Elimina un usuario por su ID.
   
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-user/${userId}`);
  }

  //Promueve un usuario a administrador.
   
  makeAdmin(userId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/promote-user/${userId}`, {});
  }

   //Revoca el rol de administrador a un usuario.
   
  revokeAdmin(userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/revoke-admin/${userId}`, {});
  } 
}