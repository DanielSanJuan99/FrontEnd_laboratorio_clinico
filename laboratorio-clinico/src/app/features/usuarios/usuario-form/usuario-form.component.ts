import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>{{ esEdicion ? 'Editar' : 'Crear' }} Usuario</h2>
      
      <form [formGroup]="form" (ngSubmit)="guardar()">
        <div>
          <label>Nombre:</label>
          <input formControlName="nombre" type="text">
        </div>
        <div>
          <label>Apellido:</label>
          <input formControlName="apellido" type="text">
        </div>
        <div>
          <label>Email:</label>
          <input formControlName="email" type="email">
        </div>
        <button type="submit" [disabled]="form.invalid">Guardar</button>
        <button type="button" (click)="volver()">Cancelar</button>
      </form>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 400px; }
    div { margin-bottom: 10px; }
    input { width: 100%; padding: 5px; }
    button { margin-right: 10px; padding: 5px 10px; }
  `]
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
      // Agrega más campos si necesitas
    });
  }

  ngOnInit(): void {
    // Verificamos si hay un ID en la URL (modo edición)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.idEditar = Number(id);
      this.usuarioService.getById(this.idEditar).subscribe(usuario => {
        if (usuario) {
          this.form.patchValue(usuario); // Rellena el formulario
        }
      });
    }
  }

  guardar() {
    if (this.form.valid) {
      const usuario: Usuario = this.form.value;

      if (this.esEdicion && this.idEditar) {
        this.usuarioService.update(this.idEditar, usuario).subscribe(() => {
          this.router.navigate(['/usuarios']);
        });
      } else {
        this.usuarioService.create(usuario).subscribe(() => {
          this.router.navigate(['/usuarios']);
        });
      }
    }
  }

  volver() {
    this.router.navigate(['/usuarios']);
  }
}