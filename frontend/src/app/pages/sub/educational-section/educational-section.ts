import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPageComponent } from "../../../components/header-page/header-page";
import { TranslateModule } from '@ngx-translate/core';

// Interfaces para categorías educativas y datos biológicos
interface EduCategory {
  id: string;
  titleKey: string;
  subtitleKey: string;
  descKey: string;
  icon: string;
  image: string;
}

interface BioFact {
  textKey: string;
  species: string;
}

@Component({
  selector: 'app-educational-section',
  standalone: true,
  imports: [CommonModule, HeaderPageComponent, TranslateModule],
  templateUrl: './educational-section.html',
  styleUrls: ['./educational-section.css']
})
export class EducationalSection implements AfterViewInit, OnDestroy {
  // Categorías educativas
  categories: EduCategory[] = [
    {
      id: 'bio',
      titleKey: 'EDU.CAT.BIO.TITLE',
      subtitleKey: 'EDU.CAT.BIO.SUBTITLE',
      descKey: 'EDU.CAT.BIO.DESC',
      icon: '🌍',
      image: 'assets/background.jpg'
    },
    {
      id: 'park',
      titleKey: 'EDU.CAT.PARK.TITLE',
      subtitleKey: 'EDU.CAT.PARK.SUBTITLE',
      descKey: 'EDU.CAT.PARK.DESC',
      icon: '🏔️',
      image: 'assets/sierra_San_Pedro_Martir.jpg'
    },
    {
      id: 'flora',
      titleKey: 'EDU.CAT.FLORA.TITLE',
      subtitleKey: 'EDU.CAT.FLORA.SUBTITLE',
      descKey: 'EDU.CAT.FLORA.DESC',
      icon: '🐾',
      image: 'assets/santa_elena_canon.jpg'
    }
  ];

  // Datos biológicos
  facts: BioFact[] = [
    { textKey: 'EDU.FACTS.JAGUAR', species: 'Panthera onca' },
    { textKey: 'EDU.FACTS.OAK', species: 'Quercus' },
    { textKey: 'EDU.FACTS.MEXICAN_WOLF', species: 'Canis lupus baileyi' },
    { textKey: 'EDU.FACTS.MANGLAR', species: 'Ecosistema Costero' }
  ];

  currentFactIndex = 0;
  observer: IntersectionObserver | undefined;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('in-view');
        } else {
          this.el.nativeElement.classList.remove('in-view');
        }
      });
    }, {
      threshold: 0.2 
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // Muestra el siguiente dato biológico
  nextFact() {
    this.currentFactIndex = (this.currentFactIndex + 1) % this.facts.length;
  }
}