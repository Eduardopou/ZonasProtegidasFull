// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

// Respuesta esperada del login
interface LoginResponse {
  token: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this._isLoggedIn.next(this.isLoggedIn());
    }
  }

  // Inicia sesión y guarda token y roles
  login(credentials: any): Observable<any> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials) // Usamos la interfaz LoginResponse
      .pipe(
        tap(response => {
          // Almacena el token
          localStorage.setItem('jwt_token', response.token);
          
          // Almacena los roles (convirtiéndolos a string)
          localStorage.setItem('user_roles', JSON.stringify(response.roles)); 
          
          this._isLoggedIn.next(true);
        })
      );
  }

  /**
   * Registra un nuevo usuario.
   * @param userData Objeto con { username, email, password }
   */
  register(userData: any): Observable<any> {
    // El registro normalmente no devuelve un token, solo una confirmación (ej. 201 Created)
    // Por eso no usamos .pipe(tap(...)) para autologuear.
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    // Elimina el token y los roles
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_roles'); // <-- Limpiar roles
    this._isLoggedIn.next(false);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('jwt_token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('jwt_token');
    }
    return false;
  }

  // --- Métodos para Roles ---

  getRoles(): string[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const roles = localStorage.getItem('user_roles');
      if (roles) {
        return JSON.parse(roles);
      }
    }
    return [];
  }

  hasRole(role: string): boolean {
    const roles = this.getRoles();
    return roles.includes(role);
  }
}