import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AnimalService, ZonaProtegida } from '../../../services/add-animal/add-animal-service.service';
import { AnimalResponse } from '../../../../models/animal-response.model';
import { HeaderPageComponent } from '../../../../components/header-page/header-page';
import { BackButton } from '../../../../components/back-button/back-button';

@Component({
  selector: 'app-edit-animal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderPageComponent, BackButton, TranslateModule],
  templateUrl: './edit-animal.html',
  styleUrl: './edit-animal.css'
})
export class EditAnimalComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  animalService = inject(AnimalService);
  constructor(private translate: TranslateService) {}

  // Formulario para editar animal. Los nombres deben coincidir con la interfaz AnimalInt.
  editForm = new FormGroup({
    common_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    scientific_name: new FormControl(''),
    danger_extinction: new FormControl<boolean>(false, [Validators.required]),
    area: new FormControl<number | null>(null, [Validators.required]),
    img_animal: new FormControl<File | null>(null) // Imagen es opcional al editar
  });

  animalId!: number;
  currentImageUrl: string | null = null;
  zonas: ZonaProtegida[] = [];
  isLoading = true;
  
  successMessage: string | null = null;
  errorMessage: string | null = null;

  ngOnInit() {
    // Cargamos las zonas protegidas antes de cargar los datos del animal
    this.animalService.getZonas().subscribe(zonas => {
      this.zonas = zonas;
      this.loadAnimalData();
    });
  }

  
   //Carga los datos del animal a editar. Si los datos vienen del router state, los usa; si no, los busca por ID.
   
  loadAnimalData() {
    this.animalId = Number(this.route.snapshot.paramMap.get('id'));
    const stateData = history.state.data as AnimalResponse;
    if (stateData && stateData.id === this.animalId) {
      this.patchForm(stateData);
    } else {
      this.animalService.getAllAnimals().subscribe({
        next: (animals) => {
          const found = animals.find(a => a.id === this.animalId);
          if (found) {
            this.patchForm(found);
          } else {
            this.errorMessage = this.translate.instant('ADMIN.EDIT_ANIMAL.MESSAGES.NOT_FOUND');
          }
        },
        error: () => this.errorMessage = this.translate.instant('ADMIN.EDIT_ANIMAL.MESSAGES.LOAD_ERROR')
      });
    }
  }

  
   //Llena el formulario con los datos del animal y busca la zona protegida correspondiente.
  
  patchForm(animal: AnimalResponse) {
    this.currentImageUrl = 'http://localhost:8080' + animal.image;
    const zonaObj = this.zonas.find(z => z.nombre === animal.zonaProtegidaNombre);
    const zonaId = zonaObj ? zonaObj.id : null;
    this.editForm.patchValue({
      common_name: animal.name,
      scientific_name: animal.scientificName,
      danger_extinction: animal.extinction,
      area: zonaId
    });
    this.isLoading = false;
  }

  //Maneja el cambio de imagen y actualiza la previsualización.
  
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.editForm.patchValue({ img_animal: file });
      const reader = new FileReader();
      reader.onload = (e) => this.currentImageUrl = e.target?.result as string;
      reader.readAsDataURL(file);
    }
  }

 //Envía el formulario para actualizar el animal. Muestra mensajes de éxito o error.
  
  onSubmit() {
    if (this.editForm.invalid) return;
    this.successMessage = null;
    this.errorMessage = null;
    const values = this.editForm.value;
    const file = values.img_animal;
    this.animalService.updateAnimal(this.animalId, values, file).subscribe({
      next: () => {
        this.successMessage = this.translate.instant('ADMIN.EDIT_ANIMAL.MESSAGES.SUCCESS');
        setTimeout(() => this.router.navigate(['/admin/manage-animals']), 2000);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = this.translate.instant('ADMIN.EDIT_ANIMAL.MESSAGES.ERROR');
      }
    });
  }

  // Getters para validación en HTML
  get common_name() { return this.editForm.get('common_name'); }
  get area() { return this.editForm.get('area'); }
}