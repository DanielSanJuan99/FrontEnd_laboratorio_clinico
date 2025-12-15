import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Laboratorio, LaboratorioDTO } from '../models/laboratorio';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  private apiUrl = 'http://localhost:8081/api/laboratorios';

  constructor(private http: HttpClient) { }

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
}