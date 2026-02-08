import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InvestigacionResponse } from '../../../models/investigacion-response.model';
import { ResearchManagementService, ResearchPayload } from '../../services/research-management/research-management.service';
import { BackButton } from "../../../components/back-button/back-button";
import { HeaderPageComponent } from "../../../components/header-page/header-page";

interface StatusOption {
  value: string;
  labelKey: string;
}

@Component({
  selector: 'app-research-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, BackButton, HeaderPageComponent],
  templateUrl: './research-management.component.html',
  styleUrls: ['./research-management.component.css']
})
export class ResearchManagementComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(ResearchManagementService);
  private translate = inject(TranslateService);

  researchForm: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(4)]],
    institucion: ['', [Validators.required]],
    investigadorPrincipal: ['', [Validators.required]],
    fechaInicio: ['', [Validators.required]],
    estado: ['EN_CURSO', [Validators.required]],
    resumen: ['', [Validators.required, Validators.minLength(20)]],
    permisosGobierno: ['', [Validators.required]],
    progreso: [25, [Validators.required, Validators.min(0), Validators.max(100)]],
    zonaProtegidaNombre: ['', [Validators.required]]
  });

  investigations = signal<InvestigacionResponse[]>([]);
  filteredInvestigations = signal<InvestigacionResponse[]>([]);

  statusFilter = signal<string>('ALL');
  searchTerm = signal<string>('');

  isLoadingList = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  editingId: number | null = null;

  statusOptions: StatusOption[] = [
    { value: 'EN_CURSO', labelKey: 'ADMIN.RESEARCH.STATUS.IN_PROGRESS' },
    { value: 'PAUSADO', labelKey: 'ADMIN.RESEARCH.STATUS.PAUSED' },
    { value: 'COMPLETADO', labelKey: 'ADMIN.RESEARCH.STATUS.COMPLETED' }
  ];

  get titulo() { return this.researchForm.get('titulo'); }
  get resumen() { return this.researchForm.get('resumen'); }

  ngOnInit(): void {
    this.loadInvestigations();
  }

  loadInvestigations(): void {
    this.isLoadingList.set(true);
    this.service.getInvestigaciones().subscribe({
      next: (data) => {
        this.investigations.set(data);
        this.applyFilters();
        this.isLoadingList.set(false);
      },
      error: () => {
        this.investigations.set([]);
        this.filteredInvestigations.set([]);
        this.isLoadingList.set(false);
      }
    });
  }

  submitForm(): void {
    if (this.researchForm.invalid) {
      this.researchForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    const payload = this.researchForm.value as ResearchPayload;

    const request$ = this.editingId
      ? this.service.updateInvestigacion(this.editingId, payload)
      : this.service.createInvestigacion(payload);

    request$.subscribe({
      next: () => {
        this.resetForm();
        this.loadInvestigations();
        this.isSaving.set(false);
      },
      error: () => {
        this.isSaving.set(false);
      }
    });
  }

  resetForm(): void {
    this.researchForm.reset({
      titulo: '',
      institucion: '',
      investigadorPrincipal: '',
      fechaInicio: '',
      estado: 'EN_CURSO',
      resumen: '',
      permisosGobierno: '',
      progreso: 25,
      zonaProtegidaNombre: ''
    });
    this.editingId = null;
  }

  editInvestigation(item: InvestigacionResponse): void {
    this.editingId = item.id;
    this.researchForm.patchValue({
      titulo: item.titulo,
      institucion: item.institucion,
      investigadorPrincipal: item.investigadorPrincipal,
      fechaInicio: item.fechaInicio,
      estado: item.estado,
      resumen: item.resumen,
      permisosGobierno: item.permisosGobierno,
      progreso: item.progreso,
      zonaProtegidaNombre: item.zonaProtegidaNombre
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteInvestigation(item: InvestigacionResponse): void {
    if (!confirm(this.translate.instant('ADMIN.RESEARCH.ACTIONS.CONFIRM_DELETE', { title: item.titulo }))) {
      return;
    }

    this.service.deleteInvestigacion(item.id).subscribe({
      next: () => this.loadInvestigations()
    });
  }

  completeInvestigation(item: InvestigacionResponse): void {
    this.service.markCompleted(item.id).subscribe({
      next: () => this.loadInvestigations()
    });
  }

  applyFilters(): void {
    const term = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    const filtered = this.investigations().filter((item) => {
      const matchesSearch =
        item.titulo.toLowerCase().includes(term) ||
        item.institucion.toLowerCase().includes(term) ||
        item.investigadorPrincipal.toLowerCase().includes(term);

      const matchesStatus = status === 'ALL' ? true : item.estado === status;
      return matchesSearch && matchesStatus;
    });
    this.filteredInvestigations.set(filtered);
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
    this.applyFilters();
  }

  onStatusChange(value: string): void {
    this.statusFilter.set(value);
    this.applyFilters();
  }

  getTotalByStatus(status: string): number {
    return this.investigations().filter((item) => item.estado === status).length;
  }

  getProgressClass(value: number): string {
    if (value >= 75) return 'progress-high';
    if (value >= 40) return 'progress-med';
    return 'progress-low';
  }
}

