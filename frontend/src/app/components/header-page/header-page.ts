import { Component, effect, HostBinding, HostListener, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { EyeMenu} from '../eye-menu/eye-menu';
import { Languages } from "../languages/languages";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header-page',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    EyeMenu,
    Languages,
    TranslateModule
  ],
  templateUrl: './header-page.html',
  styleUrl: './header-page.css'
})
export class HeaderPageComponent {
  // Servicio de autenticación para estado de usuario
  authService = inject(AuthService);
  // Última posición del scroll
  private lastScrollY = 0;
  // Oculta el header si es true
  @HostBinding('class.header-hidden') isHidden = false;

  constructor (public AuthService: AuthService) {}

  // Escucha el evento scroll para mostrar/ocultar el header
  @HostListener('window:scroll')
  onWindowScroll() {
    const currentScrollY = window.scrollY;
    if (currentScrollY === 0) {
      this.isHidden = false;
    } else if (currentScrollY > this.lastScrollY) {
      this.isHidden = true;
    } else if (currentScrollY < this.lastScrollY) {
      this.isHidden = false;
    }
    this.lastScrollY = currentScrollY;
  }

  // Refleja si el usuario está logueado
  isLoggedIn = this.authService.isLoggedIn;
  router = inject(Router);

  // Cierra la sesión y redirige al inicio
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onSidenavItemClick() {
  }
}
