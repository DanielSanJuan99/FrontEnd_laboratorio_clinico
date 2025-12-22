import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  // Helper para ejecutar el guard funcional
  const executeGuard: CanActivateFn = (...guardArgs) => 
      TestBed.runInInjectionContext(() => authGuard(...guardArgs));

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  it('debería permitir acceso si está autenticado', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
    const result = executeGuard({} as any, {} as any);
    expect(result).toBeTrue();
  });

  it('debería bloquear y redirigir si NO está autenticado', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);
    const result = executeGuard({} as any, {} as any);
    
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});