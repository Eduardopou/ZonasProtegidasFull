import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AnimalService } from '../../services/add-animal/add-animal-service.service';
import { AnimalResponse } from '../../../models/animal-response.model';

@Component({
  selector: 'app-manage-animals',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './manage-animals.html',
  styleUrl: './manage-animals.css'
})
export class ManageAnimalsComponent implements OnInit {
  animalService = inject(AnimalService);
  animals: AnimalResponse[] = [];
  filteredAnimals: AnimalResponse[] = [];
  searchTerm: string = '';

  ngOnInit() {
    this.loadAnimals();
  }

 
    //Carga la lista de animales desde el servicio y aplica el filtro si hay búsqueda activa.
    //Este metodo puede ser llamado por el padre usando ViewChild.
   
  loadAnimals() {
    this.animalService.getAllAnimals().subscribe({
      next: (data) => {
        this.animals = data;
        this.filteredAnimals = data;
        if(this.searchTerm) {
           this.filterAnimals({target: {value: this.searchTerm}});
        }
      },
      error: (e) => console.error('Error cargando animales:', e)
    });
  }

 //Filtra la lista de animales por nombre común o científico según el término de búsqueda.
   
  filterAnimals(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredAnimals = this.animals.filter(a =>
      a.name.toLowerCase().includes(this.searchTerm) ||
      a.scientificName.toLowerCase().includes(this.searchTerm)
    );
  }
}