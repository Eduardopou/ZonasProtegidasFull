import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //Obtener los roles requeridos de la data de la ruta
  const requiredRoles = route.data['roles'] as string[];

  //Verificar si el usuario está logueado
  if (!authService.isLoggedIn()) {
    // Si no está logueado, redirigir a login
    router.navigate(['/login']);
    return false;
  }

  //Verificar si no se requieren roles específicos 
  if (!requiredRoles || requiredRoles.length === 0) {
    return true; // Acceso permitido si solo requiere autenticación
  }

  //Verificar si el usuario tiene AL MENOS UNO de los roles requeridos
  const hasRequiredRole = requiredRoles.some(role => authService.hasRole(role));

  if (hasRequiredRole) {
    return true; // El usuario tiene el rol, permitir acceso
  } else {
    // El usuario no tiene el rol, redirigir a la página de inicio
    router.navigate(['/']); 
    return false;
  }
};