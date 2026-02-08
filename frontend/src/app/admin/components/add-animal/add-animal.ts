import { Component, OnInit, Output, EventEmitter } from '@angular/core'; // Importar Output y EventEmitter
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AnimalService, ZonaProtegida } from '../../services/add-animal/add-animal-service.service';

@Component({
  selector: 'app-add-animal',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './add-animal.html',
  styleUrl: './add-animal.css'
})
export class AddAnimal implements OnInit {
  // Evento para avisar al padre que se agregó un animal
  @Output() animalAdded = new EventEmitter<void>(); 

  animalForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    scientificName: new FormControl('', [Validators.maxLength(80)]),
    extinction: new FormControl<boolean|null>(null, [Validators.required]),
    file: new FormControl<File|null>(null, [Validators.required]),
    zonaProtegidaId: new FormControl<number|null>(null, [Validators.required])
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;
  zonas: ZonaProtegida[] = [];
  
  constructor(private animalService: AnimalService, private translate: TranslateService) {}

  ngOnInit() {
    this.loadZonas();
  }

  loadZonas() {
    this.animalService.getZonas().subscribe({
      next: (data) => this.zonas = data,
      error: (error) => console.error('Error loading zonas', error)
    });
  }

  post_animal() {
    this.errorMessage = null;
    this.successMessage = null;
    this.animalForm.markAllAsTouched();

    if (this.animalForm.invalid) {
      this.errorMessage = this.translate.instant('ADMIN.ADD_ANIMAL.MESSAGES.FORM_ERROR');
      return;
    }

    this.animalService.addAnimal(this.animalForm.value).subscribe({
      next: (response) => {
        this.successMessage = this.translate.instant('ADMIN.ADD_ANIMAL.MESSAGES.SUCCESS');
        this.animalForm.reset();
        
        this.animalAdded.emit(); 
        
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (error) => {
        this.errorMessage = this.translate.instant('ADMIN.ADD_ANIMAL.MESSAGES.ERROR');
      }
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) {
        this.animalForm.get('file')?.setErrors({ invalidType: true });
      } else {
        this.animalForm.get('file')?.setValue(file);
        this.animalForm.get('file')?.setErrors(null);
      }
    }
  }

  // Getters se mantienen igual...
  get name() { return this.animalForm.get('name'); }
  get scientificName() { return this.animalForm.get('scientificName'); }
  get extinction() { return this.animalForm.get('extinction'); }
  get file() { return this.animalForm.get('file'); }
  get zonaProtegidaId() { return this.animalForm.get('zonaProtegidaId'); }
}