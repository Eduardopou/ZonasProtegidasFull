import { Component, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements AfterViewInit, OnDestroy {
  // Observador para animación de entrada/salida
  observer: IntersectionObserver | undefined;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.initScrollAnimation();
  }
  
  ngOnDestroy() {
    // Limpieza del observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // Inicializa la animación de aparición al hacer scroll
  initScrollAnimation(): void {
    const hostElement = this.el.nativeElement;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          hostElement.classList.add('in-view');
        } else {
          hostElement.classList.remove('in-view');
        }
      });
    }, {
      threshold: 0.1 
    });
    this.observer.observe(hostElement);
  }
}