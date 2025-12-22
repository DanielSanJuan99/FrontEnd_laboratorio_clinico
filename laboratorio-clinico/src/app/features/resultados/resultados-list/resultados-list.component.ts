import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResultadoService } from '../../../services/resultado.service';
import { Resultado } from '../../../models/resultado';

@Component({
  selector: 'app-resultados-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between mb-4">
        <h2>Resultados Clínicos</h2>
        <button routerLink="/resultados/crear" class="btn btn-primary">Nuevo Resultado</button>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Fecha</th> <th>Examen</th> <th>Valor</th> <th>Rango</th> <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let r of resultados">
            <td>{{ r.fechaExamen }}</td>
            <td>{{ r.tipoExamen?.nombre || 'General' }}</td>
            <td>{{ r.valorResultado }} {{ r.unidadMedida?.nombre }}</td>
            <td>{{ r.valorRefMin }} - {{ r.valorRefMax }}</td>
            <td>
              <button [routerLink]="['/resultados/editar', r.id]" class="btn btn-sm btn-outline-secondary me-2">Editar</button>
              <button (click)="eliminar(r.id)" class="btn btn-sm btn-outline-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ResultadosListComponent implements OnInit {
  resultados: Resultado[] = [];

  constructor(private readonly resultadoService: ResultadoService) {}

  ngOnInit(): void {
    this.cargarResultados();
  }

  cargarResultados() {
    this.resultadoService.listarResultados().subscribe({
      next: (data) => this.resultados = data,
      error: (e) => console.error(e)
    });
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar resultado?')) {
      this.resultadoService.eliminarResultado(id).subscribe({
        next: () => this.cargarResultados(),
        error: (e) => alert('Error al eliminar')
      });
    }
  }
}