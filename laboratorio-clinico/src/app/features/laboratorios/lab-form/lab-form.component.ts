import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LaboratorioService } from '../../../services/laboratorio.service';
import { Laboratorio, LaboratorioDTO } from '../../../models/laboratorio';

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
  `
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
      webUrl: [''],
      email: ['', [Validators.required, Validators.email]],
      convenioId: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.idEditar = Number(id);

      this.laboratorioService.obtenerLaboratorioPorId(this.idEditar).subscribe(lab => {
        if (lab) {
          const dataForm = {
            nombre: lab.nombre,
            telefono: lab.telefono,
            webUrl: lab.webUrl,
            email: lab.email,
            convenioId: lab.convenio ? lab.convenio.id : null
          };
          
          this.form.patchValue(dataForm);
        }
      });
    }
  }

  guardar() {
    if (this.form.valid) {
      const payload: LaboratorioDTO = {
        nombre: this.form.value.nombre,
        telefono: this.form.value.telefono,
        webUrl: this.form.value.webUrl,
        email: this.form.value.email,
        convenioId: this.form.value.convenioId
      };

      if (this.esEdicion && this.idEditar) {
        this.laboratorioService.actualizarLaboratorio(this.idEditar, payload).subscribe({
          next: () => this.router.navigate(['/laboratorios']),
          error: (err) => console.error('Error al actualizar laboratorio', err)
        });
      } else {
        this.laboratorioService.guardarLaboratorio(payload).subscribe({
          next: () => this.router.navigate(['/laboratorios']),
          error: (err) => console.error('Error al crear', err)
        });
      }
    }
  }

  volver() {
    this.router.navigate(['/laboratorios']);
  }
}