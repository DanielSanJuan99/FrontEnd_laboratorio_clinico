import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ResultadoService } from '../../../services/resultado.service';
import { ResultadoDTO } from '../../../models/resultado';

@Component({
  selector: 'app-resultados-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2>{{ esEdicion ? 'Editar' : 'Nuevo' }} Resultado</h2>
      <form [formGroup]="form" (ngSubmit)="guardar()">
        
        <div class="row mb-3">
          <div class="col-md-6">
            <label>Valor Resultado</label>
            <input type="number" formControlName="valorResultado" class="form-control">
          </div>
          <div class="col-md-6">
            <label>Fecha</label>
            <input type="date" formControlName="fechaExamen" class="form-control">
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6"><label>Mínimo Ref</label><input type="number" formControlName="valorRefMin" class="form-control"></div>
          <div class="col-md-6"><label>Máximo Ref</label><input type="number" formControlName="valorRefMax" class="form-control"></div>
        </div>

        <div class="row mb-3">
            <div class="col-md-3"><label>ID Lab</label><input type="number" formControlName="laboratorioId" class="form-control"></div>
            <div class="col-md-3"><label>ID Usuario</label><input type="number" formControlName="usuarioId" class="form-control"></div>
            <div class="col-md-2"><label>ID Tipo</label><input type="number" formControlName="tipoExamenId" class="form-control"></div>
            <div class="col-md-2"><label>ID Param</label><input type="number" formControlName="tipoParametroId" class="form-control"></div>
            <div class="col-md-2"><label>ID Unidad</label><input type="number" formControlName="unidadMedidaId" class="form-control"></div>
        </div>

        <div class="mb-3">
          <label>Observación</label>
          <textarea formControlName="observacion" class="form-control"></textarea>
        </div>

        <button type="submit" class="btn btn-success me-2" [disabled]="form.invalid">Guardar</button>
        <button type="button" routerLink="/resultados" class="btn btn-secondary">Cancelar</button>
      </form>
    </div>
  `
})
export class ResultadosFormComponent implements OnInit {
  form: FormGroup;
  esEdicion = false;
  idEditar: number | null = null;

  constructor(
    private fb: FormBuilder,
    private resultadoService: ResultadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      valorResultado: [null, Validators.required],
      valorRefMin: [0],
      valorRefMax: [0],
      observacion: [''],
      fechaExamen: ['', Validators.required],
      laboratorioId: [1, Validators.required], // Valor por defecto para agilizar
      usuarioId: [1, Validators.required],
      tipoExamenId: [1, Validators.required],
      tipoParametroId: [1, Validators.required],
      unidadMedidaId: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.idEditar = +id;
      this.resultadoService.obtenerPorId(this.idEditar).subscribe(res => {
        // Aplanamos los objetos anidados para el form
        this.form.patchValue({
          ...res,
          tipoExamenId: res.tipoExamen?.id,
          tipoParametroId: res.tipoParametro?.id,
          unidadMedidaId: res.unidadMedida?.id
        });
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const dto: ResultadoDTO = this.form.value;

    if (this.esEdicion && this.idEditar) {
      this.resultadoService.actualizarResultado(this.idEditar, dto).subscribe(() => {
        this.router.navigate(['/resultados']);
      });
    } else {
      this.resultadoService.guardarResultado(dto).subscribe(() => {
        this.router.navigate(['/resultados']);
      });
    }
  }
}