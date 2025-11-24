import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LaboratorioService } from '../../../services/laboratorio.service';
import { Laboratorio } from '../../../models/laboratorio';

@Component({
  selector: 'app-lab-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Listado de Laboratorios</h2>
      <button routerLink="/laboratorios/crear" class="btn-crear">Nuevo Laboratorio</button>
      
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Web / Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let lab of laboratorios">
            <td>{{ lab.nombre }}</td>
            <td>{{ lab.telefono }}</td>
            <td>
              <div><small>Web: {{ lab.webUrl }}</small></div>
              <div><small>Email: {{ lab.email }}</small></div>
            </td>
            <td>
              <button [routerLink]="['/laboratorios/editar', lab.id]">Editar</button>
              <button (click)="eliminar(lab.id)">Eliminar</button>
            </td>
          </tr>
          <tr *ngIf="laboratorios.length === 0">
            <td colspan="4" style="text-align: center;">No hay laboratorios registrados.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    .btn-crear { background-color: #007bff; color: white; padding: 10px; margin-bottom: 10px; border: none; cursor: pointer; }
    button { margin-right: 5px; cursor: pointer; }
  `]
})
export class LabListComponent implements OnInit {
  laboratorios: Laboratorio[] = [];

  constructor(private laboratorioService: LaboratorioService) {}

  ngOnInit(): void {
    this.cargarLaboratorios();
  }

  cargarLaboratorios() {
    this.laboratorioService.getAll().subscribe(data => {
      this.laboratorios = data;
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este laboratorio?')) {
      this.laboratorioService.delete(id).subscribe(() => {
        this.cargarLaboratorios();
      });
    }
  }
}