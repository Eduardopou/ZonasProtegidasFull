import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-introduction-zones',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './introduction-zones.html',
  styleUrls: ['./introduction-zones.css']
})
export class IntroductionZones implements OnInit, OnDestroy {
  dynamicWords: string[] = ['EXPLORA', 'PROTEGE', 'CUIDA', 'VIVE'];
  currentWord: string = '';
  wordIndex: number = 0;
  charIndex: number = 0;
  isDeleting: boolean = false;
  typingSpeed: number = 150;

  // Imágenes del carrusel
  imagesList = [
    '/assets/tigre.jpg',
    '/assets/background4.jpg',
    '/assets/toro.jpg',
    '/assets/buho.jpg'
  ];
  currentImageIndex = 0;
  carouselInterval: any;

  // Estadísticas para mostrar
  stats = [
    { labelKey: 'PROTECTED_AREAS', value: 185, current: 0 },
    { labelKey: 'REGISTERED_SPECIES', value: 2400, current: 0 },
    { labelKey: 'STATES', value: 32, current: 0 }
  ];

  constructor(private router: Router, private el: ElementRef) {}

  ngOnInit(): void {
    this.startTypingEffect();
    this.startCarousel();
    this.animateStats();
  }

  ngAfterViewInit() {
    // Observador para animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        console.log("VISIBLE?", entry.isIntersecting); 

        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('in-view');
        } else {
          this.el.nativeElement.classList.remove('in-view');
        }
      });
    }, { threshold: 0.4 });

    observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    // Limpieza de intervalos y observers
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  //Efecto de Máquina de Escribir
  startTypingEffect() {
    const currentFullWord = this.dynamicWords[this.wordIndex];

    if (this.isDeleting) {
      this.currentWord = currentFullWord.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.currentWord = currentFullWord.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.typingSpeed;

    if (this.isDeleting) typeSpeed /= 2; 

    if (!this.isDeleting && this.charIndex === currentFullWord.length) {
      typeSpeed = 2000; 
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.dynamicWords.length;
    }

    setTimeout(() => this.startTypingEffect(), typeSpeed);
  }

  // Carrusel Automático
  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imagesList.length;
    }, 5000);
  }

  // 3. Animación de Números 
  animateStats() {
    this.stats.forEach(stat => {
      const duration = 2000; 
      const steps = 50;
      const increment = stat.value / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        stat.current = Math.floor(increment * currentStep);
        if (currentStep >= steps) {
          stat.current = stat.value; 
          clearInterval(interval);
        }
      }, duration / steps);
    });
  }

  // Navegación
  goToRegister() { this.router.navigate(['/register']); }
  goToExplore() { this.router.navigate(['/explore']); } 
  goToRandomArea() {
    // Lógica simulada para efecto visual
    alert("¡Buscando coordenadas de destino aleatorio... 🌎!");
  }
}