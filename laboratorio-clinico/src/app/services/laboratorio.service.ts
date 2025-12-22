import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Laboratorio, LaboratorioDTO } from '../models/laboratorio';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  private readonly apiUrl = environment.apiUrlLaboratorios;

  constructor(private readonly http: HttpClient) { }

  obtenerLaboratorios(): Observable<Laboratorio[]> {
    return this.http.get<Laboratorio[]>(this.apiUrl);
  }

  obtenerLaboratorioPorId(id: number): Observable<Laboratorio> {
    return this.http.get<Laboratorio>(`${this.apiUrl}/${id}`);
  }

  guardarLaboratorio(laboratorio: LaboratorioDTO): Observable<Laboratorio> {
    return this.http.post<Laboratorio>(this.apiUrl, laboratorio);
  }

  actualizarLaboratorio(id: number, laboratorio: LaboratorioDTO): Observable<Laboratorio> {
    return this.http.put<Laboratorio>(`${this.apiUrl}/${id}`, laboratorio);
  }

  eliminarLaboratorio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}