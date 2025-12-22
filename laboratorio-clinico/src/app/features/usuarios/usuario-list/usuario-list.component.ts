import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para *ngFor
import { RouterModule } from '@angular/router'; // Importante para routerLink
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // Importar módulos necesarios
  template: `
<div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Listado de Usuarios</h2>
        <button routerLink="/usuarios/crear" class="btn btn-primary">
          <i class="bi bi-person-plus-fill"></i> Nuevo Usuario
        </button>
      </div>
      
      <div class="card shadow-sm border-0">
        <div class="card-body p-0">
          <table class="table table-hover table-striped mb-0">
            <thead class="table-light">
              <tr>
                <th>Nombre Completo</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Laboratorio</th>
                <th class="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of usuarios">
                <td class="align-middle fw-medium">{{ user.nombre }} {{ user.apellido }}</td>
                <td class="align-middle">{{ user.email }}</td>
                
                <td class="align-middle">
                  <span class="badge bg-secondary" *ngIf="user.rol">
                    {{ user.rol.nombre || 'ID: ' + user.rol.id }}
                  </span>
                  <span *ngIf="!user.rol" class="text-muted small">-</span>
                </td>

                <td class="align-middle">
                  <span class="badge bg-info text-dark" *ngIf="user.laboratorio">
                    {{ user.laboratorio.nombre || 'ID: ' + user.laboratorio.id }}
                  </span>
                  <span *ngIf="!user.laboratorio" class="text-muted small">Sin asignar</span>
                </td>

                <td class="align-middle text-end">
                  <button [routerLink]="['/usuarios/editar', user.id]" class="btn btn-sm btn-outline-primary me-2">
                    Editar
                  </button>
                  <button (click)="eliminar(user.id)" class="btn btn-sm btn-outline-danger">
                    Eliminar
                  </button>
                </td>
              </tr>
              <tr *ngIf="usuarios.length === 0">
                <td colspan="5" class="text-center py-4 text-muted">No hay usuarios registrados.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private readonly usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => {
          this.cargarUsuarios();
        },
        error: (err) => {
          console.error('Error al eliminar', err);
          alert('No se pudo eliminar el usuario.'); // <--- El test espera esto
        }
      });
    }
  }
}