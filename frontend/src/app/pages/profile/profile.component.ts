import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserResponse } from '../../models/user-response.model';
import { AnimalResponse } from '../../models/animal-response.model'; 
import { UserService } from '../../services/user/user.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderPageComponent } from "../../components/header-page/header-page";
import { BackButton } from "../../components/back-button/back-button";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderPageComponent,
    BackButton,
    TranslateModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Datos del usuario
  user: UserResponse | null = null;
  isLoading = true;
  isEditing = false;
  errorMessage: string | null = null;
  editData = {
    nombre: ''
  };
  // Favoritos del usuario
  favorites: AnimalResponse[] = [];
  favoritesErrorMessage: string | null = null;

  constructor(private userService: UserService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadUserFavorites(); 
  }

  // Carga el perfil del usuario
  loadUserProfile(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.editData.nombre = data.nombre; 
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = this.translate.instant('PROFILE.ERROR_LOADING');
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Carga los favoritos del usuario
  loadUserFavorites(): void {
    this.favoritesErrorMessage = null;
    this.userService.getFavorites().subscribe({
      next: (data) => {
        this.favorites = data;
      },
      error: (err) => {
        this.favoritesErrorMessage = this.translate.instant('PROFILE.ERRORS.LOAD_FAVORITES');
        console.error(err);
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.user && !this.isEditing) {
      this.editData.nombre = this.user.nombre;
    }
  }

  saveProfile(): void {
    if (!this.user || !this.editData.nombre) return;
    this.isLoading = true;
    this.errorMessage = null;
    this.userService.updateUserProfile(this.editData).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.isEditing = false;
        this.isLoading = false;
        this.editData.nombre = updatedUser.nombre; 
      },
      error: (err) => {
        this.errorMessage = this.translate.instant('PROFILE.ERRORS.SAVE_PROFILE');
        this.isLoading = false;
        console.error(err);
      }
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.isLoading = true;
      this.errorMessage = null;
      this.userService.uploadProfileImage(file).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = this.translate.instant('PROFILE.ERRORS.UPLOAD_IMAGE');
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }


  removeFavorite(animalId: number): void {
    if (!confirm(this.translate.instant('PROFILE.JOURNAL.CONFIRM_REMOVE'))) {
      return;
    }

    this.favoritesErrorMessage = null;
    this.userService.removeFavorite(animalId).subscribe({
      next: () => {
        // Actualiza la lista en el frontend sin recargar
        this.favorites = this.favorites.filter(animal => animal.id !== animalId);
      },
      error: (err) => {
        this.favoritesErrorMessage = this.translate.instant('PROFILE.ERRORS.REMOVE_FAVORITE');
        console.error(err);
      }
    });
  }

  goToAnimalInfo(animalId: number): void {
    // Función de marcador de posición
    console.log('Navegar a la información del animal:', animalId);
    alert(this.translate.instant('PROFILE.JOURNAL.VIEW_MORE_TODO'));
  }

  getFullImageUrl(imagePath: string | null | undefined): string {
    if (!imagePath) {
      return 'assets/user.png'; // Imagen por defecto
    }
    return `http://localhost:8080${imagePath}`;
  }

  // Traducción de roles (ADMIN/USER) a etiquetas localizadas
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