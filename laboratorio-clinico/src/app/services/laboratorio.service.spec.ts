import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LaboratorioService } from './laboratorio.service';
import { Laboratorio, LaboratorioDTO } from '../models/laboratorio';
import { environment } from '../../environments/environments';

describe('LaboratorioService', () => {
  let service: LaboratorioService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrlLaboratorios;

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

  it('obtenerLaboratorioPorId debería retornar un solo laboratorio (GET)', () => {
    const dummyLab: Laboratorio = { 
        id: 1, 
        nombre: 'Lab 1', 
        telefono: '123', 
        email: 'test@lab.com', 
        webUrl: 'www.lab.com',
        convenio: { id: 1, nombre: 'Fonasa' }
    };

    service.obtenerLaboratorioPorId(1).subscribe(lab => {
      expect(lab).toEqual(dummyLab);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLab);
  });

  it('guardarLaboratorio debería enviar un DTO y devolver el laboratorio creado (POST)', () => {
    const nuevoLabDTO: LaboratorioDTO = { 
        nombre: 'Nuevo Lab', 
        telefono: '999', 
        email: 'nuevo@lab.com', 
        webUrl: 'www.nuevo.com',
        convenioId: 1 
    };

    const mockResponse: Laboratorio = {
        id: 10,
        nombre: 'Nuevo Lab',
        telefono: '999',
        email: 'nuevo@lab.com',
        webUrl: 'www.nuevo.com',
        convenio: { id: 1, nombre: 'Fonasa' }
    };

    service.guardarLaboratorio(nuevoLabDTO).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    
    expect(req.request.body).toEqual(nuevoLabDTO);

    req.flush(mockResponse);
  });

  it('actualizarLaboratorio debería actualizar los datos (PUT)', () => {
    const editLabDTO: LaboratorioDTO = { 
        nombre: 'Lab Editado', 
        telefono: '888', 
        email: 'edit@lab.com', 
        convenioId: 2 
    };

    const mockResponse: Laboratorio = {
        id: 1,
        nombre: 'Lab Editado',
        telefono: '888',
        webUrl: 'www.old.com',
        email: 'edit@lab.com',
        convenio: { id: 2, nombre: 'Isapre' }
    };

    service.actualizarLaboratorio(1, editLabDTO).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(editLabDTO);

    req.flush(mockResponse);
  });

  it('eliminarLaboratorio debería borrar el registro (DELETE)', () => {
    service.eliminarLaboratorio(1).subscribe(res => {
      expect(res).toBeNull(); 
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    
    req.flush(null);
  });
});