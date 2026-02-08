import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private renderer: Renderer2;
  private isDyslexiaActive = false;
  private isDaltonismActive = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  // Activa/desactiva el modo dislexia
  toggleDyslexiaMode(): boolean {
    this.isDyslexiaActive = !this.isDyslexiaActive;
    if (this.isDyslexiaActive) {
      this.renderer.addClass(this.document.body, 'modo-dislexia');
    } else {
      this.renderer.removeClass(this.document.body, 'modo-dislexia');
    }
    return this.isDyslexiaActive;
  }

  // Indica si el modo dislexia está activo
  isActive(): boolean {
    return this.isDyslexiaActive;
  }

  // Activa/desactiva el modo daltonismo
  toggleDaltonismMode(): boolean {
    this.isDaltonismActive = !this.isDaltonismActive;
    if (this.isDaltonismActive) {
      this.renderer.addClass(this.document.body, 'modo-daltonismo');
    } else {
      this.renderer.removeClass(this.document.body, 'modo-daltonismo');
    }
    return this.isDaltonismActive;
  }

  // Indica si el modo daltonismo está activo
  isDaltonismEnabled(): boolean {
    return this.isDaltonismActive;
  }
}