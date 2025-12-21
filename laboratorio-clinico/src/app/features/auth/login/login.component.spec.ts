import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Necesario si usas http en login
import { RouterTestingModule } from '@angular/router/testing'; // Para simular rutas
import { throwError, of } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, // Importamos el componente Standalone
        HttpClientTestingModule,
        RouterTestingModule 
      ],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario debería ser inválido cuando está vacío', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('formulario debería ser válido con email y password correctos', () => {
    component.loginForm.controls['email'].setValue('test@duoc.cl');
    component.loginForm.controls['password'].setValue('123456');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('debería llamar a onSubmit y activar isLoading', () => {
    component.loginForm.controls['email'].setValue('test@duoc.cl');
    component.loginForm.controls['password'].setValue('123456');

    component.onSubmit();

    expect(component.isLoading).toBeTrue();
  });

  it('debería manejar error 401 (Credenciales inválidas)', () => {
    spyOn(component['authService'], 'login').and.returnValue(throwError(() => ({ status: 401 }))); 
    
    const consoleSpy = spyOn(console, 'error');

    component.loginForm.patchValue({ email: 'bad@test.com', password: 'wrong' });

    component.onSubmit();

    expect(component.isLoading).toBeFalse();
    expect(consoleSpy).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Credenciales incorrectas. Intenta nuevamente.');
  });

  it('debería redirigir si el login es exitoso', () => {
    const loginSpy = spyOn(authService, 'login').and.returnValue(of({ token: 'fake-jwt-token' }));
    
    component.loginForm.patchValue({ email: 'admin@duoc.cl', password: '123' });
    component.onSubmit();

    expect(loginSpy).toHaveBeenCalled();
  });
});