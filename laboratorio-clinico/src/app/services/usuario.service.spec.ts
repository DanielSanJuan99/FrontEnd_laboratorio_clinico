import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';
import { environment } from '../../environments/environments';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrlUsuarios; // Asegúrate de que esto coincida con tu service

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService]
    });
    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('obtenerUsuarios debería retornar una lista (GET)', () => {
    const dummyUsers = [
      { id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juan@test.com' },
      { id: 2, nombre: 'Ana', apellido: 'Gomez', email: 'ana@test.com' }
    ];

    service.obtenerUsuarios().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('crearUsuario debería enviar datos por POST', () => {
    const nuevoUser = { id: 99, nombre: 'Test', apellido: 'User', email: 't@t.com', rolId: 1 };

    service.crearUsuario(nuevoUser).subscribe(user => {
      expect(user).toEqual(nuevoUser as any);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nuevoUser);
    req.flush(nuevoUser);
  });

  it('eliminarUsuario debería ejecutar DELETE', () => {
    const id = 123;
    service.eliminarUsuario(id).subscribe(res => {
        expect(res).toBeNull(); // O lo que devuelva tu backend
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});