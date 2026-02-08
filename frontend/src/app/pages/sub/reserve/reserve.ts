import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderPageComponent } from '../../../components/header-page/header-page';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { InvestigacionResponse } from '../../../models/investigacion-response.model';
import { Reglamento } from '../../../models/reglamento-response.model';
import { Actividad } from '../../../models/actividad.model';
import { CommentsSectionComponent } from "../../../components/comments-section/comments-section";
import { BackButton } from '../../../components/back-button/back-button';
import { GeminiService } from '../../../services/gemini/gemini';



interface Animal {
  id: number;
  name: string;
  scientificName: string;
  extinction: boolean;
  image: string;
  zonaProtegidaNombre: string;
}



@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [CommonModule, HeaderPageComponent, HttpClientModule, RouterModule, CommentsSectionComponent, BackButton, TranslateModule],
  templateUrl: './reserve.html',
  styleUrls: ['./reserve.css'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ opacity: 0, transform: 'translateY(-15px)' })),
      ]),
    ]),
  ],
})
export class Reserve implements OnInit {
  zonaId: string | null = null;
  activeTab = 'animales';
  animales: Animal[] = [];
  loading = false;
  nombreZona: string = '';
  //VARIABLES PARA EL MODAL Y LA IA
  showModal: boolean = false;
  selectedAnimal: Animal | null = null;
  aiDescription: string = '';
  loadingAI: boolean = false;
  
  tabs = [
    { id: 'animales', labelKey: 'RESERVE.TAB.ANIMALS' },
    { id: 'investigaciones', labelKey: 'RESERVE.TAB.RESEARCH' },
    { id: 'reglamento', labelKey: 'RESERVE.TAB.RULES' },
    { id: 'actividades', labelKey: 'RESERVE.TAB.EXPERIENCES' },
    { id: 'mapa', labelKey: 'RESERVE.TAB.MAP' },
  ];


  // Variables para Investigacion
  investigaciones: InvestigacionResponse[] = [];
  loadingInvestigaciones: boolean = false;

  // Variables para Reglamento
  reglamentos: Reglamento[] = [];
  loadingReglamento: boolean = false;

  // VARIABLES ACTIVIDADES
  actividades: Actividad[] = [];
  loadingActividades: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private geminiService: GeminiService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.zonaId = this.route.snapshot.paramMap.get('id');
    if (this.zonaId) {
      console.log('ID de la zona capturado:', this.zonaId);
      this.getAnimalesPorZona(this.zonaId);
      this.obtenerInvestigaciones(this.zonaId);
      this.obtenerReglamento(this.zonaId);
      this.obtenerActividades(this.zonaId);
    }
  }

  setActive(tabId: string) {
    this.activeTab = tabId;
    if (tabId === 'investigaciones' && this.zonaId) {
       this.obtenerInvestigaciones(this.zonaId);
    } 
    
  }

  getAnimalesPorZona(id: string) {
    this.loading = true;
    this.http.get<Animal[]>(`http://localhost:8080/animal/getByZone/${id}`).subscribe({
      next: (data) => {
        this.animales = data.map(a => ({
          ...a,
          image: `http://localhost:8080${a.image}`
        }));

if (data.length > 0) {
          this.nombreZona = data[0].zonaProtegidaNombre;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener animales:', err);
        this.loading = false;
      },
    });
  }

abrirModal(animal: Animal) {
  this.selectedAnimal = animal;
  this.showModal = true;
    this.aiDescription = ''; 
  this.loadingAI = true;

// Validación de seguridad
  if (!animal || !animal.name) {
    this.aiDescription = this.translate.instant('RESERVE.AI.MISSING_DATA');
    this.loadingAI = false;
    return;
  }

const zoneName = this.nombreZona || this.translate.instant('RESERVE.AI.FALLBACK_ZONE');
const prompt = this.translate.instant('RESERVE.AI.PROMPT', {
  animalName: animal.name,
  scientificName: animal.scientificName,
  zoneName
});
  
console.log('Prompt generado:', prompt); 

this.geminiService.generateText(prompt).subscribe({
    next: (response: any) => {
  
      if (response && response.success && response.data) {
        this.aiDescription = response.data;
      } else {
        this.aiDescription = this.translate.instant('RESERVE.AI.NO_DATA');
      }
      
      this.loadingAI = false;
    },
    error: (err) => {
      console.error('Error IA:', err);
      this.aiDescription = this.translate.instant('RESERVE.AI.UNAVAILABLE');
      this.loadingAI = false;
    }
  });
}

  cerrarModal() {
    this.showModal = false;
    this.selectedAnimal = null;
  }

  // Método para ir al detalle completo desde el modal
  irADetalleCompleto() {
    if (this.selectedAnimal) {
      this.router.navigate(['/animal', this.selectedAnimal.id], {
        state: { animal: this.selectedAnimal }
      });
    }
  }

  agregarAFavoritos(animalId: number, event: MouseEvent): void {
    event.stopPropagation();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { 
        queryParams: { redirect: this.router.url } 
      });
      return;
    }
    this.userService.addFavorite(animalId).subscribe({
      next: () => alert(this.translate.instant('RESERVE.ANIMALS.ADD_FAVORITE_SUCCESS')),
      error: (err) => {
        console.error('Error al agregar a favoritos', err);
        alert(this.translate.instant('RESERVE.ANIMALS.ADD_FAVORITE_ERROR'));
      }
    });
  }

  obtenerInvestigaciones(idZona: string) {
    this.loadingInvestigaciones = true;
    
    const url = `http://localhost:8080/investigaciones/zona/${idZona}`;

    this.http.get<InvestigacionResponse[]>(url)
      .subscribe({
        next: (data) => {
          console.log(`Investigaciones de la zona ${idZona}:`, data);
          this.investigaciones = data;
          this.loadingInvestigaciones = false;
        },
        error: (err) => {
          console.error('Error al obtener investigaciones por zona:', err);
          this.loadingInvestigaciones = false;
          this.investigaciones = []; 
        }
      });
  }

  getStatusClass(estado: string): string {
    if (!estado) return 'status-default';
    const s = estado.toLowerCase();
    if (s.includes('curso')) return 'status-active';
    if (s.includes('publicado') || s.includes('concluido')) return 'status-success';
    if (s.includes('pausado')) return 'status-warning';
    return 'status-default';
  }



  //Reglamento
  obtenerReglamento(idZona: string) {
    this.loadingReglamento = true;
    const url = `http://localhost:8080/reglamento/zona/${idZona}`; 
    
    this.http.get<Reglamento[]>(url).subscribe({
      next: (data) => {
        this.reglamentos = data.sort((a, b) => b.severidad - a.severidad);
        this.loadingReglamento = false;
      },
      error: (err) => {
        console.error('Error cargando reglamento', err);
        this.cargarMockReglamento(); 
        this.loadingReglamento = false;
      }
    });
  }

  // Auxiliar para clases CSS
  getRuleClass(tipo: string): string {
    switch(tipo) {
      case 'PROHIBICION': return 'rule-danger';
      case 'OBLIGACION': return 'rule-warning';
      case 'RECOMENDACION': return 'rule-info';
      default: return 'rule-default';
    }
  }

  //ACTIVIDADES
  obtenerActividades(idZona: string) {
    this.loadingActividades = true;
    const url = `http://localhost:8080/actividades/zona/${idZona}`;

    this.http.get<Actividad[]>(url).subscribe({
      next: (data) => {
        // Mapeamos la imagen si viene relativa
        this.actividades = data.map(act => ({
            ...act,
            imagenUrl: act.imagenUrl.startsWith('http') ? act.imagenUrl : `http://localhost:8080${act.imagenUrl}`
        }));
        this.loadingActividades = false;
      },
      error: (err) => {
        console.error('Error cargando actividades', err);
        this.cargarMockActividades(); 
        this.loadingActividades = false;
      }
    });
  }

  // Helper para color de dificultad
  getDifficultyClass(dificultad: string): string {
    if (!dificultad) return 'diff-low';
    switch (dificultad.toUpperCase()) {
      case 'BAJA': return 'diff-low';       
      case 'MEDIA': return 'diff-med';     
      case 'ALTA': return 'diff-high';      
      case 'EXTREMA': return 'diff-extreme'; 
      default: return 'diff-low';
    }
  }

  // Mock temporal 
  cargarMockActividades() {
    this.actividades = [
      {
        id: 1,
        titulo: "Senderismo al Mirador",
        descripcion: "Caminata interpretativa a través del bosque de niebla hasta llegar a la cima.",
        imagenUrl: "assets/sierra_San_Pedro_Martir.jpg", // Usa una de tus imágenes
        dificultad: 'MEDIA',
        duracion: "3 horas",
        requiereGuia: false,
        costo: 50
      },
      {
        id: 2,
        titulo: "Rappel en Cañón",
        descripcion: "Descenso técnico por las paredes verticales del cañón principal.",
        imagenUrl: "assets/santa_elena_canon.jpg",
        dificultad: 'ALTA',
        duracion: "5 horas",
        requiereGuia: true,
        costo: 850
      },
      {
        id: 3,
        titulo: "Observación de Aves",
        descripcion: "Tour guiado para identificar y fotografiar aves endémicas.",
        imagenUrl: "assets/observacion_aves.jpg",
        dificultad: 'BAJA',
        duracion: "2 horas",
        requiereGuia: true,
        costo: 200
      }
    ];
  }



// Mock para pruebas inmediatas
  cargarMockReglamento() {
    this.reglamentos = [
      {
        id: 1,
        titulo: "Prohibido hacer fogatas",
        descripcion: "El uso de fuego está estrictamente prohibido fuera de las zonas de asadores designadas.",
        icono: "🔥",
        tipo: "PROHIBICION",
        severidad: 3,
        sancion: "Multa de $5,000 a $20,000 MXN",
        articuloLegal: "Art. 156 Ley Forestal"
      },
      {
        id: 2,
        titulo: "Uso obligatorio de casco",
        descripcion: "Para actividades de escalada y ciclismo de montaña.",
        icono: "⛑️",
        tipo: "OBLIGACION",
        severidad: 2,
        sancion: "Suspensión del permiso de entrada"
      },
      {
        id: 3,
        titulo: "No alimentar a la fauna",
        descripcion: "La comida humana altera la dieta y comportamiento de los animales.",
        icono: "🍔",
        tipo: "PROHIBICION",
        severidad: 3,
        sancion: "Expulsión inmediata"
      },
      {
        id: 4,
        titulo: "Llévate tu basura",
        descripcion: "Principio 'Leave No Trace'. Lo que entra contigo, sale contigo.",
        icono: "🗑️",
        tipo: "RECOMENDACION",
        severidad: 1
      }
    ];
  }






}