import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LaboratorioService } from './laboratorio.service';
import { Laboratorio } from '../models/laboratorio';

describe('LaboratorioService', () => {
  let service: LaboratorioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LaboratorioService]
    });
    service = TestBed.inject(LaboratorioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no queden peticiones pendientes
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('listarLaboratorios debería retornar una lista de laboratorios (GET)', () => {
    const dummyLabs: Laboratorio[] = [
      { id: 1, nombre: 'Lab 1', telefono: '123', email: 'test@lab.com', webUrl: 'www.lab.com' },
      { id: 2, nombre: 'Lab 2', telefono: '456', email: 'test2@lab.com', webUrl: 'www.lab2.com' }
    ];

    service.obtenerLaboratorios().subscribe(labs => {
      expect(labs.length).toBe(2);
      expect(labs).toEqual(dummyLabs);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/laboratorios');
    expect(req.request.method).toBe('GET');

    req.flush(dummyLabs);
  });
});