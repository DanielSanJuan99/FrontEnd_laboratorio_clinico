import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environments';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('login debería hacer POST y guardar el token en localStorage', () => {
    const dummyCredentials = { email: 'test@duoc.cl', password: '123' };
    const mockResponse = { token: 'fake-jwt-token-123' };

    const setItemSpy = spyOn(localStorage, 'setItem');

    service.login(dummyCredentials).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.apiUrlAuthLogin); 
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyCredentials);

    req.flush(mockResponse);

    expect(setItemSpy).toHaveBeenCalledWith('token', 'fake-jwt-token-123');
  });

  it('logout debería eliminar el token del localStorage', () => {
    const removeItemSpy = spyOn(localStorage, 'removeItem');
    
    service.logout();

    expect(removeItemSpy).toHaveBeenCalledWith('token');
  });

  it('isAuthenticated debería retornar TRUE si existe el token', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token-existente');

    const isLogged = service.isAuthenticated();

    expect(isLogged).toBeTrue();
  });

  it('isAuthenticated debería retornar FALSE si no hay token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const isLogged = service.isAuthenticated();

    expect(isLogged).toBeFalse();
  });

  it('getToken debería devolver el token almacenado', () => {
    const fakeToken = 'abc-123';
    spyOn(localStorage, 'getItem').and.returnValue(fakeToken);

    const token = service.getToken();

    expect(token).toBe(fakeToken);
  });
});