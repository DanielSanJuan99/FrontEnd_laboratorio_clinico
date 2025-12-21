import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabListComponent } from './lab-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Necesario para routerLink
import { LaboratorioService } from '../../../services/laboratorio.service';
import { of, throwError } from 'rxjs';

describe('LabListComponent', () => {
  let component: LabListComponent;
  let fixture: ComponentFixture<LabListComponent>;
  let service: LaboratorioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LabListComponent, // Standalone
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [LaboratorioService]
    }).compileComponents();

    fixture = TestBed.createComponent(LabListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LaboratorioService);
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar la lista de laboratorios al iniciar (ngOnInit)', () => {
    // Datos simulados
    const dummyLabs = [
      { id: 1, nombre: 'Lab A', telefono: '111', email: 'a@a.com', webUrl: 'www.a.com' },
      { id: 2, nombre: 'Lab B', telefono: '222', email: 'b@b.com', webUrl: 'www.b.com' }
    ];

    const spy = spyOn(service, 'obtenerLaboratorios').and.returnValue(of(dummyLabs));

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.laboratorios.length).toBe(2);
    expect(component.laboratorios).toEqual(dummyLabs);
  });

  it('debería manejar errores del servidor al cargar laboratorios', () => {
    spyOn(service, 'obtenerLaboratorios').and.returnValue(throwError(() => new Error('Error 500')));
  
    const consoleSpy = spyOn(console, 'error');

    component.cargarLaboratorios();

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('debería eliminar y recargar la lista si el usuario confirma y el servidor responde OK', () => {
    spyOn(globalThis, 'confirm').and.returnValue(true);

    const deleteSpy = spyOn(service, 'eliminarLaboratorio').and.returnValue(of(undefined));

    const reloadSpy = spyOn(component, 'cargarLaboratorios');

    component.eliminar(123);

    expect(deleteSpy).toHaveBeenCalledWith(123);
    expect(reloadSpy).toHaveBeenCalled();
  });

  it('NO debería eliminar si el usuario cancela la confirmación', () => {
    spyOn(globalThis, 'confirm').and.returnValue(false);
    
    const deleteSpy = spyOn(service, 'eliminarLaboratorio');

    component.eliminar(1);

    expect(deleteSpy).not.toHaveBeenCalled();
  });

  it('debería manejar errores del servidor al intentar eliminar', () => {
    spyOn(globalThis, 'confirm').and.returnValue(true);

    spyOn(service, 'eliminarLaboratorio').and.returnValue(throwError(() => new Error('Error al borrar')));
    
    const consoleSpy = spyOn(console, 'error');

    component.eliminar(1);

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('debería mostrar un alert si falla la eliminación', () => {
    spyOn(globalThis, 'confirm').and.returnValue(true);

    spyOn(service, 'eliminarLaboratorio').and.returnValue(throwError(() => new Error('Backend Error')));

    const alertSpy = spyOn(globalThis, 'alert');
    spyOn(console, 'error'); 

    component.eliminar(1);

    expect(alertSpy).toHaveBeenCalledWith('No se pudo eliminar el laboratorio.');
  });
});