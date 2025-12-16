import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioFormComponent } from './usuario-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('UsuarioFormComponent', () => {
  let component: UsuarioFormComponent;
  let fixture: ComponentFixture<UsuarioFormComponent>;
  let service: UsuarioService;
  
  let routeSpy = {
    snapshot: { paramMap: { get: jasmine.createSpy('get') } }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioFormComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        UsuarioService,
        { provide: ActivatedRoute, useValue: routeSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UsuarioService);
  });

  it('MODO CREAR: password debería ser obligatorio', () => {
    routeSpy.snapshot.paramMap.get.and.returnValue(null);
    fixture.detectChanges();

    const passControl = component.form.get('password');
    passControl?.setValue('');
    expect(passControl?.valid).toBeFalsy();
  });

  it('MODO EDITAR: debería cargar usuario y hacer password opcional', () => {
    routeSpy.snapshot.paramMap.get.and.returnValue('5');
    
    const mockUser = { 
      id: 5, nombre: 'Ana', apellido: 'Gomez', email: 'ana@test.com',
      rol: { id: 2 }, laboratorio: { id: 3 }
    };
    spyOn(service, 'obtenerUsuarioPorId').and.returnValue(of(mockUser as any));

    fixture.detectChanges();

    expect(component.form.get('nombre')?.value).toBe('Ana');
    expect(component.form.get('rolId')?.value).toBe(2);

    const passControl = component.form.get('password');
    passControl?.setValue('');
    expect(passControl?.valid).toBeTruthy(); 
  });
});