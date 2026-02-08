import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AccessibilityService } from '../../services/accessibility/accessibility';

@Component({
  selector: 'app-eye-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, CommonModule],
  providers: [AccessibilityService],
  templateUrl: './eye-menu.html',
  styleUrls: ['./eye-menu.css'],
})
export class EyeMenu {
  // Servicio de accesibilidad para modos visuales
  accessibilityService = inject(AccessibilityService);

  // Activa/desactiva el modo dislexia
  toggleDyslexia() {
    this.accessibilityService.toggleDyslexiaMode();
  }

  // Activa/desactiva el modo daltonismo
  toggleDaltonism() {
    this.accessibilityService.toggleDaltonismMode();
  }

  // Indica si el modo dislexia está activo
  get isDyslexiaActive() {
    return this.accessibilityService.isActive();
  }

  // Indica si el modo daltonismo está activo
  get isDaltonismActive() {
    return this.accessibilityService.isDaltonismEnabled();
  }
}