import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LaboratorioService } from '../../../services/laboratorio.service';
import { Laboratorio } from '../../../models/laboratorio';

@Component({
  selector: 'app-lab-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>{{ esEdicion ? 'Editar' : 'Crear' }} Laboratorio</h2>
      
      <form [formGroup]="form" (ngSubmit)="guardar()">
        <div>
          <label>Nombre:</label>
          <input formControlName="nombre" type="text" placeholder="Ej: Laboratorio Central">
        </div>
        
        <div>
          <label>Teléfono:</label>
          <input formControlName="telefono" type="text" placeholder="+569...">
        </div>
        
        <div>
          <label>Sitio Web (URL):</label>
          <input formControlName="webUrl" type="text" placeholder="www.lab.cl">
        </div>

        <div>
          <label>Email:</label>
          <input formControlName="email" type="email" placeholder="contacto@lab.cl">
        </div>

        <div>
          <label>ID Convenio (Opcional):</label>
          <input formControlName="convenioId" type="number" placeholder="ID numérico">
        </div>

        <div class="actions">
          <button type="submit" [disabled]="form.invalid" class="btn-save">Guardar</button>
          <button type="button" (click)="volver()" class="btn-cancel">Cancelar</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 500px; }
    div { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    input { width: 100%; padding: 8px; box-sizing: border-box; }
    .actions { margin-top: 20px; }
    .btn-save { background-color: #28a745; color: white; padding: 10px 20px; border: none; cursor: pointer; }
    .btn-save:disabled { background-color: #ccc; }
    .btn-cancel { background-color: #6c757d; color: white; padding: 10px 20px; border: none; margin-left: 10px; cursor: pointer; }
  `]
})
export class LabFormComponent implements OnInit {
  form: FormGroup;
  esEdicion = false;
  idEditar: number | null = null;

  constructor(
    private fb: FormBuilder,
    private laboratorioService: LaboratorioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      webUrl: ['', Validators.required], // Puedes quitar Validators.required si es opcional
      email: ['', [Validators.required, Validators.email]],
      convenioId: [null]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.idEditar = Number(id);
      this.laboratorioService.getById(this.idEditar).subscribe(lab => {
        if (lab) {
          this.form.patchValue(lab);
        }
      });
    }
  }

  guardar() {
    if (this.form.valid) {
      const laboratorio: Laboratorio = this.form.value;

      if (this.esEdicion && this.idEditar) {
        this.laboratorioService.update(this.idEditar, laboratorio).subscribe(() => {
          this.router.navigate(['/laboratorios']);
        });
      } else {
        this.laboratorioService.create(laboratorio).subscribe(() => {
          this.router.navigate(['/laboratorios']);
        });
      }
    }
  }

  volver() {
    this.router.navigate(['/laboratorios']);
  }
}