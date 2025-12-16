import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioFormComponent } from './usuario-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioService } from '../../../services/usuario.service';
import { of } from 'rxjs';

describe('UsuarioFormComponent', () => {
  let component: UsuarioFormComponent;
  let fixture: ComponentFixture<UsuarioFormComponent>;
  let service: UsuarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UsuarioFormComponent, 
        HttpClientTestingModule, 
        RouterTestingModule
      ],
      providers: [UsuarioService]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UsuarioService);
    fixture.detectChanges();
  });

  it('debería inicializarse', () => {
    expect(component).toBeTruthy();
  });

  it('debería validar que el email es requerido', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();
    
    emailControl?.setValue('correo-invalido'); // Sin @
    expect(emailControl?.valid).toBeFalsy();

    emailControl?.setValue('daniel@duoc.cl');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('debería requerir password si es usuario nuevo', () => {
    // Por defecto esEdicion = false
    const passControl = component.form.get('password');
    passControl?.setValue('');
    expect(passControl?.valid).toBeFalsy();
  });

  it('debería enviar los datos al servicio al guardar', () => {
    const spy = spyOn(service, 'crearUsuario').and.returnValue(of({} as any));

    component.form.patchValue({
      nombre: 'Daniel',
      apellido: 'San Juan',
      email: 'daniel@test.com',
      password: 'securePass123',
      rolId: 1,
      laboratorioId: 2
    });

    component.guardar();

    expect(spy).toHaveBeenCalled();
  });
});