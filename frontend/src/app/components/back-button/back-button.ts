import { Component, Input, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-button.html',
  styleUrls: ['./back-button.css'],
})

export class BackButton {
  // Servicio de ubicación para manejar la navegación hacia atrás
  private location = inject(Location);

  @Input() label: string = 'Regresar';
  @Input() floating: boolean = false;

  // Navega a la página anterior
  goBack(): void {
    this.location.back();
  }
}