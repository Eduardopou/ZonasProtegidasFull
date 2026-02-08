import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Zona } from '../../../services/zona/zona';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-zonas-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './zonas-dialog.html',
  styleUrls: ['./zonas-dialog.css']
})
export class ZonasDialogComponent {
  // Lista de zonas recibidas desde el componente Home
  zonas: Zona[] = [];

  constructor(
    public dialogRef: MatDialogRef<ZonasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { zonas: Zona[] }
  ) {
    // Recibimos las zonas desde el componente Home
    this.zonas = data.zonas;
  }

  // Cierra el diálogo sin seleccionar nada
  onClose(): void {
    this.dialogRef.close();
  }

  // Cierra el diálogo y devuelve la zona seleccionada
  onZoneSelect(zona: Zona): void {
    this.dialogRef.close(zona);
  }
}