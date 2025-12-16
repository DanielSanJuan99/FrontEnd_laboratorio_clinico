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
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Listado de Laboratorios</h2>
        <button routerLink="/laboratorios/crear" class="btn btn-primary">
          <i class="bi bi-plus-lg"></i> Nuevo Laboratorio
        </button>
      </div>
      
      <div class="card shadow-sm border-0">
        <div class="card-body p-0">
          <table class="table table-hover table-striped mb-0">
            <thead class="table-light">
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Información</th>
                <th>Convenio</th> <th class="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let lab of laboratorios">
                <td class="align-middle fw-medium">{{ lab.nombre }}</td>
                <td class="align-middle">{{ lab.telefono }}</td>
                <td class="align-middle">
                  <div class="small text-muted"><i class="bi bi-globe"></i> {{ lab.webUrl || 'Sin web' }}</div>
                  <div class="small text-muted"><i class="bi bi-envelope"></i> {{ lab.email }}</div>
                </td>
                
                <td class="align-middle">
                  <span class="badge bg-info text-dark" *ngIf="lab.convenio">
                    {{ lab.convenio.nombre }}
                  </span>
                  <span class="text-muted small" *ngIf="!lab.convenio">Sin convenio</span>
                </td>

                <td class="align-middle text-end">
                  <button [routerLink]="['/laboratorios/editar', lab.id]" class="btn btn-sm btn-outline-secondary me-2">
                    Editar
                  </button>
                  
                  </td>
              </tr>
              
              <tr *ngIf="laboratorios.length === 0">
                <td colspan="5" class="text-center py-4 text-muted">
                  No hay laboratorios registrados.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class LabListComponent implements OnInit {
  laboratorios: Laboratorio[] = [];

  constructor(private laboratorioService: LaboratorioService) {}

  ngOnInit(): void {
    this.cargarLaboratorios();
  }

  cargarLaboratorios() {
    this.laboratorioService.obtenerLaboratorios().subscribe({
      next: (data) => this.laboratorios = data,
      error: (err) => console.error('Error al cargar laboratorios', err)
    })
  }
}