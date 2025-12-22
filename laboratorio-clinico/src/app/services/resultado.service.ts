import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Resultado, ResultadoDTO } from '../models/resultado';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private readonly apiUrl = environment.apiUrlResultados;

  constructor(private readonly http: HttpClient) { }

  listarResultados(): Observable<Resultado[]> {
    return this.http.get<Resultado[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Resultado> {
    return this.http.get<Resultado>(`${this.apiUrl}/${id}`);
  }

  listarPorPaciente(usuarioId: number): Observable<Resultado[]> {
    return this.http.get<Resultado[]>(`${this.apiUrl}/paciente/${usuarioId}`);
  }

  guardarResultado(dto: ResultadoDTO): Observable<Resultado> {
    return this.http.post<Resultado>(this.apiUrl, dto);
  }

  actualizarResultado(id: number, dto: ResultadoDTO): Observable<Resultado> {
    return this.http.put<Resultado>(`${this.apiUrl}/${id}`, dto);
  }

  eliminarResultado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}