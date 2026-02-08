import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search-by-state',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './search-by-state.html',
  styleUrls: ['./search-by-state.css']
})
export class SearchByState implements AfterViewInit, OnDestroy {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef<HTMLDivElement>;
  @ViewChild('container', { static: false }) container!: ElementRef<HTMLDivElement>;

  estados: string[] = ['Chihuahua', 'Baja California', 'Nuevo León'];
  zonas = [
    {
      id: 1,
      nombre: 'Cañón de Santa Elena',
      estado: 'Chihuahua',
      imagen: '/assets/santa_elena_canon.jpg',
      coordenadas: { lat: 29.5, lng: -104.6 }
    },
    {
      id: 2,
      nombre: 'Sierra de San Pedro Mártir',
      estado: 'Baja California',
      imagen: '/assets/sierra_San_Pedro_Martir.jpg',
      coordenadas: { lat: 30.98, lng: -115.5 }
    },
    {
      id: 3,
      nombre: 'Cumbres de Monterrey',
      estado: 'Nuevo León',
      imagen: '/assets/cumbres-de-monterrey-parque-nacional.jpg',
      coordenadas: { lat: 25.6, lng: -100.3 }
    }
  ];

  zonasFiltradas = [...this.zonas];
  indiceActual = 0;
  autoplayInterval: any;
  observer: IntersectionObserver | undefined; // Referencia del observador

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.iniciarAutoPlay();
    this.initScrollAnimation(); 
  }

  ngOnDestroy(): void {
    clearInterval(this.autoplayInterval);
    if (this.observer) {
      this.observer.disconnect(); // Desconectar al destruir el componente
    }
  }

  //Lógica de Intersección Reversible
  initScrollAnimation(): void {
    if (!this.container) return;
    const containerElement = this.container.nativeElement;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          containerElement.classList.add('in-view');
        } else {
          containerElement.classList.remove('in-view');
        }
      });
    }, { 
      threshold: 0.2 
    });

    this.observer.observe(containerElement);
  }
  filtrarPorEstado(event: any): void {
    const estado = event.target.value;
    this.zonasFiltradas = estado
      ? this.zonas.filter(z => z.estado === estado)
      : [...this.zonas];
  }

  moverCarrusel(direccion: number): void {
    if (!this.carousel) return;
    
    const elemento = this.carousel.nativeElement;
    const cardWidth = 320; 
    elemento.scrollBy({ left: direccion * cardWidth, behavior: 'smooth' });

    this.indiceActual =
      (this.indiceActual + direccion + this.zonasFiltradas.length) %
      this.zonasFiltradas.length;
  }

  abrirZona(id: number): void {
    this.router.navigate(['/zona', id]); 
  }
  
  verEnMapa(zona: any, event: Event): void {
    event.stopPropagation(); 
    const { lat, lng } = zona.coordenadas;
    window.open(`http://maps.google.com/?q=${lat},${lng}`, '_blank');
  }

  iniciarAutoPlay(): void {
    this.autoplayInterval = setInterval(() => {
      this.moverCarrusel(1);
    }, 5000); 
  }

  pausarAutoPlay(): void {
    clearInterval(this.autoplayInterval);
  }

  reanudarAutoPlay(): void {
    this.iniciarAutoPlay();
  }
}