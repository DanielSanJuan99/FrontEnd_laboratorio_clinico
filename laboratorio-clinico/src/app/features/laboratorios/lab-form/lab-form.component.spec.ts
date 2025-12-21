import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabFormComponent } from './lab-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LaboratorioService } from '../../../services/laboratorio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('LabFormComponent', () => {
  let component: LabFormComponent;
  let fixture: ComponentFixture<LabFormComponent>;
  let service: LaboratorioService;

  let routeSpy = {
    snapshot: { paramMap: { get: jasmine.createSpy('get') } }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabFormComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        LaboratorioService,
        { provide: ActivatedRoute, useValue: routeSpy } // Inyectamos el espía
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LabFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LaboratorioService);
  });

  it('MODO CREAR: debería iniciar con formulario vacío', () => {
    routeSpy.snapshot.paramMap.get.and.returnValue(null);
    fixture.detectChanges();

    expect(component.esEdicion).toBeFalse();
    expect(component.form.valid).toBeFalsy();
  });

  it('MODO EDITAR: debería cargar datos y extraer el ID del convenio', () => {
    routeSpy.snapshot.paramMap.get.and.returnValue('10');

    const mockLab = { 
      id: 10, 
      nombre: 'Lab Editado', 
      telefono: '12345678', 
      email: 'test@lab.com', 
      webUrl: 'www.lab.com',
      convenio: { id: 99, nombre: 'Fonasa' }
    };
    spyOn(service, 'obtenerLaboratorioPorId').and.returnValue(of(mockLab as any));

    fixture.detectChanges(); 

    expect(component.esEdicion).toBeTrue();
    expect(component.idEditar).toBe(10);
    expect(component.form.get('nombre')?.value).toBe('Lab Editado');
    expect(component.form.get('convenioId')?.value).toBe(99);
  });

  it('GUARDAR: debería llamar a actualizarLaboratorio si es edición', () => {
    routeSpy.snapshot.paramMap.get.and.returnValue('10');
    spyOn(service, 'obtenerLaboratorioPorId').and.returnValue(of({} as any));
    const updateSpy = spyOn(service, 'actualizarLaboratorio').and.returnValue(of({} as any));
    
    fixture.detectChanges();

    component.form.patchValue({ nombre: 'X', telefono: '12345678', email: 'a@a.com', convenioId: 1 });
    
    component.guardar();

    expect(updateSpy).toHaveBeenCalled();
  });

  it('debería navegar hacia atrás al llamar a volver()', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.volver();

    expect(navigateSpy).toHaveBeenCalledWith(['/laboratorios']);
  });
});