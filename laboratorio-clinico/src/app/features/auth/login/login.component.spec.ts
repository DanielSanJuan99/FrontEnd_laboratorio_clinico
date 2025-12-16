import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Necesario si usas http en login
import { RouterTestingModule } from '@angular/router/testing'; // Para simular rutas

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, // Importamos el componente Standalone
        HttpClientTestingModule,
        RouterTestingModule 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
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

    const spy = spyOn(console, 'log'); 

    component.onSubmit();

    expect(component.isLoading).toBeTrue();
  });
});