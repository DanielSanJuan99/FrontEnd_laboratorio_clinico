import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadosFormComponent } from './resultados-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ResultadoService } from '../../../services/resultado.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ResultadosFormComponent', () => {
  let component: ResultadosFormComponent;
  let fixture: ComponentFixture<ResultadosFormComponent>;
  let service: ResultadoService;
  let routeSpy = { snapshot: { paramMap: { get: jasmine.createSpy('get') } } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadosFormComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        ResultadoService,
        { provide: ActivatedRoute, useValue: routeSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadosFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ResultadoService);
  });

  it('Modo Crear: Formulario inválido al inicio', () => {
    routeSpy.snapshot.paramMap.get.and.returnValue(null);
    fixture.detectChanges();
    // Aunque tiene valores por defecto, valorResultado y fecha son required y empiezan vacíos
    expect(component.form.valid).toBeFalsy();
  });

  it('Modo Editar: Carga datos correctamente', () => {
    routeSpy.snapshot.paramMap.get.and.returnValue('10');
    const mockRes = { id: 10, valorResultado: 5, tipoExamen: { id: 2 } };
    spyOn(service, 'obtenerPorId').and.returnValue(of(mockRes as any));
    
    fixture.detectChanges();
    
    expect(component.esEdicion).toBeTrue();
    expect(component.form.value.tipoExamenId).toBe(2);
  });

  it('Guardar: Llama al servicio crear si no es edición', () => {
    routeSpy.snapshot.paramMap.get.and.returnValue(null);
    fixture.detectChanges();
    const spy = spyOn(service, 'guardarResultado').and.returnValue(of({} as any));
    
    component.form.patchValue({ valorResultado: 10, fechaExamen: '2023-01-01' }); // Llenar required
    component.guardar();
    
    expect(spy).toHaveBeenCalled();
  });
});