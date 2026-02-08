import { Component, inject, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderPageComponent } from "../../components/header-page/header-page";
import { SearchByState } from '../sub/search-by-state/search-by-state';
import { Contact } from '../sub/contact/contact';
import { IntroductionZones } from '../sub/introduction-zones/introduction-zones';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ZonasDialogComponent } from './zonas-dialog/zonas-dialog';
import { ZonaService, Zona } from '../../services/zona/zona';
import { EducationalSection } from "../sub/educational-section/educational-section";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderPageComponent,
    IntroductionZones,
    SearchByState,
    Contact,
    MatDialogModule,
    EducationalSection,
    TranslateModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements AfterViewInit {
  private dialog = inject(MatDialog);
  // Servicio para obtener zonas protegidas
  private zonaService = inject(ZonaService);
  // Servicio de rutas
  private router = inject(Router);
  // Referencia al elemento raíz del componente
  private el = inject(ElementRef);

  // Hook para inicializar animaciones al cargar la vista
  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }

  private initScrollAnimations(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 
    });

    const sections = this.el.nativeElement.querySelectorAll('.animate-on-scroll');
    sections.forEach((section: Element) => observer.observe(section));
  }


  openZonasDialog(): void {
    this.zonaService.getZonas().subscribe({
      next: (zonas) => {
        const dialogRef = this.dialog.open(ZonasDialogComponent, {
          width: '90vw',
          maxWidth: '1200px',
          maxHeight: '80vh',
          panelClass: 'glassmorphism-dialog-panel',
          data: { zonas: zonas },
        });

        dialogRef.afterClosed().subscribe((selectedZona: Zona) => {
          if (selectedZona) {
            console.log('Zona seleccionada:', selectedZona);
            this.router.navigate(['/zona', selectedZona.id]);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener las zonas:', err);
      }
    });
  }
}