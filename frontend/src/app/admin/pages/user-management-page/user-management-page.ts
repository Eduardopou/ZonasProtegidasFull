import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserManagementService } from '../../services/user_management/user-management-service'; // Ajusta la ruta si es necesario
import { UserResponse } from '../../../models/user-response.model'; // Ajusta la ruta si es necesario
import { HeaderPageComponent } from '../../../components/header-page/header-page';
import { BackButton } from "../../../components/back-button/back-button";

@Component({
  selector: 'app-user-management-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderPageComponent, BackButton, TranslateModule], // Añade FormsModule
  templateUrl: './user-management-page.html',
  styleUrls: ['./user-management-page.css'] // Cambiado a styleUrls
})
export class UserManagementPage implements OnInit {


  users: UserResponse[] = []; // Lista original de usuarios
  filteredUsers: UserResponse[] = []; // Lista mostrada (después de filtrar)
  searchTerm: string = ''; // Término de búsqueda del input
  errorMessage: string | null = null;
  successMessage: string | null = null;
  // IDs en promoción para deshabilitar el botón mientras se procesa
  promoting: Set<number> = new Set<number>();

  constructor(private userManagementService: UserManagementService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Carga la lista de usuarios desde el servicio.
   */
  loadUsers(): void {
    this.errorMessage = null;
    this.userManagementService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filterUsers(); // Aplica el filtro inicial (muestra todos)
        console.log('Usuarios cargados:', this.users);
      },
      error: (err) => {
        this.errorMessage = this.translate.instant('ADMIN.USER_MANAGEMENT.MESSAGES.LOAD_ERROR');
        console.error('Error fetching users:', err);
      }
    });
  }

  /**
   * Filtra la lista de usuarios basada en el searchTerm.
   * Busca por nombre o email.
   */
  filterUsers(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredUsers = [...this.users]; // Si no hay término, muestra todos
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.nombre.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }
  }

  /**
   * Llama al servicio para eliminar un usuario y actualiza la lista local.
   * @param userId El ID del usuario a eliminar.
   */
  deleteUser(userId: number): void {
    // Confirmación simple (puedes usar un diálogo modal más adelante)
    if (!confirm(this.translate.instant('ADMIN.USER_MANAGEMENT.CONFIRM_DELETE', { id: userId }))) {
      return;
    }

    this.errorMessage = null;
    this.successMessage = null;

    this.userManagementService.deleteUser(userId).subscribe({
      next: () => {
        this.successMessage = this.translate.instant('ADMIN.USER_MANAGEMENT.MESSAGES.SUCCESS_DELETE', { id: userId });
        // Elimina el usuario de las listas locales para actualizar la vista
        this.users = this.users.filter(u => u.id !== userId);
        this.filterUsers(); // Re-aplica el filtro
        console.log(`Usuario ${userId} eliminado`);
      },
      error: (err) => {
        this.errorMessage = this.translate.instant('ADMIN.USER_MANAGEMENT.MESSAGES.ERROR_DELETE', { id: userId });
        console.error(`Error deleting user ${userId}:`, err);
      }
    });
  }

makeAdmin(userId: number) {
  this.errorMessage = null;
  this.successMessage = null;

  // Confirmación opcional
  const confirmed = confirm(this.translate.instant('ADMIN.USER_MANAGEMENT.CONFIRM_PROMOTE') || `¿Promover al usuario ${userId} a Administrador?`);
  if (!confirmed) return;

  this.promoting.add(userId);

  this.userManagementService.makeAdmin(userId).subscribe({
    next: () => {
      // Mensaje de éxito (usa literal por si no hay clave de traducción)
      this.successMessage = this.translate.instant('ADMIN.USER_MANAGEMENT.MESSAGES.SUCCESS_PROMOTE', { id: userId })
        || `Usuario ${userId} promovido a Administrador correctamente.`;

      // Actualiza rol en listas locales
      this.users = this.users.map(u => u.id === userId ? { ...u, role: 'ADMIN' } : u);
      this.filteredUsers = this.filteredUsers.map(u => u.id === userId ? { ...u, role: 'ADMIN' } : u);
    },
    error: (err) => {
      const backendMsg = typeof err?.error === 'string' ? err.error : null;
      this.errorMessage = backendMsg
        || this.translate.instant('ADMIN.USER_MANAGEMENT.MESSAGES.ERROR_PROMOTE', { id: userId })
        || `Error al promover al usuario ${userId}`;
      console.error(`Error promoting user ${userId}:`, err);
    }
  }).add(() => {
    this.promoting.delete(userId);
  });
}

  /**
   * Devuelve la clave de traducción correcta para el rol recibido.
   * Normaliza valores como "ROLE_ADMIN" o "admin" para que coincidan con el diccionario.
   */
  getRoleTranslationKey(role: string | null | undefined): string {
    if (!role) {
      return 'ADMIN.USER_MANAGEMENT.ROLES.USER';
    }

    const normalized = role.toUpperCase().replace('ROLE_', '');
    switch (normalized) {
      case 'ADMIN':
        return 'ADMIN.USER_MANAGEMENT.ROLES.ADMIN';
      case 'USER':
        return 'ADMIN.USER_MANAGEMENT.ROLES.USER';
      default:
        return 'ADMIN.USER_MANAGEMENT.ROLES.USER';
    }
  }

}