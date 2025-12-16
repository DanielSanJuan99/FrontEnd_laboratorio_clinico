import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabFormComponent } from './lab-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LaboratorioService } from '../../../services/laboratorio.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('LabFormComponent', () => {
  let component: LabFormComponent;
  let fixture: ComponentFixture<LabFormComponent>;
  let service: LaboratorioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LabFormComponent, // Standalone component
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        LaboratorioService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } } // Simulamos que NO hay ID (Modo Crear)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LabFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LaboratorioService);
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario debería ser inválido al inicio (campos vacíos)', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('debería ser válido cuando llenamos los datos correctamente', () => {
    component.form.patchValue({
      nombre: 'Lab Test',
      telefono: '12345678',
      email: 'test@lab.com',
      convenioId: 1
    });
    expect(component.form.valid).toBeTruthy();
  });

  it('debería llamar a guardarLaboratorio cuando es modo crear', () => {
    const spy = spyOn(service, 'guardarLaboratorio').and.returnValue(of({} as any));
    
    // Llenamos formulario
    component.form.patchValue({
      nombre: 'Lab Nuevo',
      telefono: '99999999',
      email: 'nuevo@lab.com',
      convenioId: 5
    });

    component.guardar();

    expect(spy).toHaveBeenCalled();
  });
});