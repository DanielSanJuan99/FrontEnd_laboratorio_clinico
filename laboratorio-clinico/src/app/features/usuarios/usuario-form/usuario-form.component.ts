import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
<div class="container mt-4 d-flex justify-content-center">
      <div class="card shadow-sm border-0" style="width: 100%; max-width: 600px;">
        <div class="card-header bg-white border-0 pt-4 pb-0">
          <h3 class="fw-bold">{{ esEdicion ? 'Editar' : 'Crear' }} Usuario</h3>
        </div>
        
        <div class="card-body">
          <form [formGroup]="form" (ngSubmit)="guardar()">
            
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Nombre</label>
                <input formControlName="nombre" type="text" class="form-control" [class.is-invalid]="esInvalido('nombre')">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Apellido</label>
                <input formControlName="apellido" type="text" class="form-control" [class.is-invalid]="esInvalido('apellido')">
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Email</label>
              <input formControlName="email" type="email" class="form-control" [class.is-invalid]="esInvalido('email')">
            </div>

            <div class="mb-3">
              <label class="form-label">Contraseña</label>
              <input formControlName="password" type="password" class="form-control" 
                     placeholder="{{ esEdicion ? '(Dejar en blanco para mantener)' : '' }}">
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">ID Rol</label>
                <input formControlName="rolId" type="number" class="form-control" placeholder="Ej: 1">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">ID Laboratorio</label>
                <input formControlName="laboratorioId" type="number" class="form-control" placeholder="Ej: 5">
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-4">
              <button type="button" (click)="volver()" class="btn btn-secondary">Cancelar</button>
              <button type="submit" [disabled]="form.invalid" class="btn btn-primary">
                {{ esEdicion ? 'Actualizar' : 'Guardar' }}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class UsuarioFormComponent implements OnInit {
  form: FormGroup;
  esEdicion = false;
  idEditar: number | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      rolId: [null, [Validators.required, Validators.min(1)]],
      laboratorioId: [null]
    });
  }

  ngOnInit(): void {
    // Verificamos si hay un ID en la URL (modo edición)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.idEditar = Number(id);
      this.usuarioService.obtenerUsuarioPorId(this.idEditar).subscribe(usuario => {
        if (usuario) {
          this.form.patchValue({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            password: '',
            rolId: usuario.rol ? usuario.rol.id : null,
            laboratorioId: usuario.laboratorio ? usuario.laboratorio.id : null
          });

          this.form.get('password')?.clearValidators();
          this.form.get('password')?.updateValueAndValidity();
        }
      });
    } else {
      this.form.get('password')?.addValidators([Validators.required, Validators.minLength(6)]);
    }
  }

  guardar() {
    if (this.form.valid) {
      const payload: any = {
        nombre: this.form.value.nombre,
        apellido: this.form.value.apellido,
        email: this.form.value.email,
        password: this.form.value.password,
        rolId: this.form.value.rolId,
        laboratorioId: this.form.value.laboratorioId
      }

      if (this.esEdicion && !payload.password) {
        delete payload.password;
      }

      if (this.esEdicion && this.idEditar) {
        this.usuarioService.actualizarUsuario(this.idEditar, payload).subscribe(() => {
          this.router.navigate(['/usuarios']);
        });
      } else {
        this.usuarioService.crearUsuario(payload).subscribe(() => {
          this.router.navigate(['/usuarios']);
        });
      }
    }
  }

  volver() {
    this.router.navigate(['/usuarios']);
  }

  esInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control?.invalid && control?.touched);
  }
}