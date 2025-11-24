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
    <div class="container">
      <h2>Listado de Usuarios</h2>
      <button routerLink="/usuarios/crear" class="btn-crear">Nuevo Usuario</button>
      
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of usuarios">
            <td>{{ user.nombre }} {{ user.apellido }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button [routerLink]="['/usuarios/editar', user.id]">Editar</button>
              <button (click)="eliminar(user.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    .btn-crear { background-color: green; color: white; padding: 10px; margin-bottom: 10px; }
    button { margin-right: 5px; cursor: pointer;}
  `]
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getAll().subscribe(data => {
      this.usuarios = data;
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.delete(id).subscribe(() => {
        this.cargarUsuarios(); // Recargar la lista
      });
    }
  }
}