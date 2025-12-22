import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResultadoService } from './resultado.service';
import { environment } from '../../environments/environments';
import { ResultadoDTO } from '../models/resultado';

describe('ResultadoService', () => {
  let service: ResultadoService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrlResultados;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResultadoService]
    });
    service = TestBed.inject(ResultadoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debería listar resultados (GET)', () => {
    service.listarResultados().subscribe(res => expect(res.length).toBe(1));
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1 }]);
  });

  it('debería guardar resultado (POST)', () => {
    const dto: ResultadoDTO = { 
      valorResultado: 10, valorRefMin: 5, valorRefMax: 15, observacion: 'Ok', 
      fechaExamen: '2023-01-01', laboratorioId: 1, usuarioId: 1,
      tipoExamenId: 1, tipoParametroId: 1, unidadMedidaId: 1
    };
    service.guardarResultado(dto).subscribe(res => expect(res).toBeTruthy());
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ id: 1, ...dto });
  });

  it('debería eliminar resultado (DELETE)', () => {
    service.eliminarResultado(1).subscribe(res => expect(res).toBeNull());
    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});