import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderPageComponent } from '../../components/header-page/header-page';
import { BackButton } from '../../components/back-button/back-button';
import { GeminiService } from '../../services/gemini/gemini';
import { AnimalService } from '../../admin/services/add-animal/add-animal-service.service';

// Interfaces para animal y ficha técnica
interface Animal {
  id: number;
  name: string;
  scientificName: string;
  extinction: boolean;
  image: string;
  zonaProtegidaNombre: string;
}

interface Fuente {
  titulo?: string;
  url?: string;
  fuente?: string;
  anio?: string | number;
}

interface FichaTecnica {
  resumen?: string;
  taxonomia?: any;
  morfologia?: any;
  habitat?: any;
  dieta?: any;
  comportamiento?: any;
  reproduccion?: any;
  conservacion?: any;
  distribucion?: any;
  amenazas?: any;
  datos_interes?: any;
  fuentes?: Fuente[];
}

@Component({
  selector: 'app-animal-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, TranslateModule, HeaderPageComponent, BackButton],
  templateUrl: './animal-detail.html',
  styleUrls: ['./animal-detail.css']
})
export class AnimalDetail implements OnInit {
  id!: number;
  animal?: Animal;
  ficha?: FichaTecnica;
  loading = true;
  loadingAI = false;
  error: string | null = null;
rawIA: any;

  constructor(
    private route: ActivatedRoute,
    private geminiService: GeminiService,
    private animalService: AnimalService,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    // Intentar obtener datos desde navigation state primero
    const stateAnimal = history.state && history.state.animal ? history.state.animal as Animal : null;
    if (stateAnimal && stateAnimal.id === this.id) {
      this.animal = stateAnimal;
      this.generarFichaConIA();
    } else {
      //usar el listado y filtrar por id 
      this.loading = true;
      this.animalService.getAllAnimals().subscribe({
        next: (list) => {
          const found = list.find(a => a.id === this.id);
          if (found) {
            // Normalizar imagen si es relativa
            const image = found.image?.startsWith('http') ? found.image : `http://localhost:8080${found.image}`;
            this.animal = { ...found, image } as Animal;
          }
          this.loading = false;
          this.generarFichaConIA();
        },
        error: () => {
          this.loading = false;
          this.error = 'No fue posible cargar los datos base del animal.';
          this.generarFichaConIA(); 
        }
      });
    }
  }

  private buildPrompt(): string {
    const nombre = this.animal?.name || '';
    const cientifico = this.animal?.scientificName || '';

    // Prompt profesional en español 
    return `Eres un asistente experto en biología que redacta fichas técnicas científicas completas y verificables para especies animales.

Contexto de la especie:
- Nombre común: ${nombre}
- Nombre científico: ${cientifico}

Requerimiento: Genera una ficha técnica rigurosa para uso académico. Responde EXCLUSIVAMENTE en JSON válido (sin texto adicional) con la siguiente estructura y claves en minúsculas:
{
  "resumen": string,
  "taxonomia": {"reino": string, "filo": string, "clase": string, "orden": string, "familia": string, "genero": string, "especie": string},
  "morfologia": {"descripcion_general": string, "dimensiones": string, "diferencias_sexuales": string, "adaptaciones_relevantes": string},
  "habitat": {"tipo": string, "caracteristicas": string, "microhabitat": string},
  "dieta": {"tipo": string, "alimentos_principales": string, "variaciones_estacionales": string},
  "comportamiento": {"actividad": string, "social": string, "territorialidad": string, "migracion": string},
  "reproduccion": {"sistema_mating": string, "ciclo_reproductivo": string, "gestacion_incubacion": string, "tamano_camada": string, "cuidado_parental": string},
  "conservacion": {"estado_uicn": string, "tendencia_poblacional": string, "amenazas_clave": string, "medidas_manejo": string},
  "distribucion": {"rango_geografico": string, "altitud": string, "mapa_descriptivo": string},
  "amenazas": {"naturales": string, "antropicas": string},
  "datos_interes": [string],
  "fuentes": [{"titulo": string, "url": string, "fuente": string, "anio": string}]
}

Criterios:
- Usa terminología científica y precisión taxonómica.
- Si la información es incierta, indícalo explícitamente.
- Prioriza fuentes primarias (artículos, libros) y catálogos oficiales (IUCN, GBIF, ITIS, Catalogue of Life, Encyclopedia of Life, NOAA, etc.).
- Incluye SIEMPRE 5-8 fuentes con títulos, URL y entidad responsable. No inventes enlaces.
- No incluyas explicaciones fuera del JSON ni bloques de código. Salida JSON pura.`;
  }

  generarFichaConIA(): void {
    this.loadingAI = true;
    this.error = null;
    const prompt = this.buildPrompt();

    this.geminiService.generateText(prompt).subscribe({
      next: (resp) => {
        // Se espera { success: boolean, data: string }
        const raw = resp?.data ?? resp;
        let text: string = typeof raw === 'string' ? raw : JSON.stringify(raw);
        // Limpieza si viene en bloque con ```json
        text = text.trim();
        if (text.startsWith('```')) {
          text = text.replace(/^```json\n?|^```\n?/i, '').replace(/```\s*$/,'').trim();
        }
        try {
          this.ficha = JSON.parse(text) as FichaTecnica;
          this.rawIA = null;
        } catch {
          this.ficha = undefined;
          this.rawIA = text; 
        }
        this.loadingAI = false;
      },
      error: (err) => {
        console.error('Error al consultar Gemini', err);
        this.loadingAI = false;
        this.error = 'El servicio de IA no está disponible temporalmente.';
      }
    });
  }
}
