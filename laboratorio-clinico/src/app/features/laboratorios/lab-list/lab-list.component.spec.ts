import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabListComponent } from './lab-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Necesario para routerLink
import { LaboratorioService } from '../../../services/laboratorio.service';
import { of } from 'rxjs';

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

    // Espiamos el servicio para que no llame al backend real
    const spy = spyOn(service, 'obtenerLaboratorios').and.returnValue(of(dummyLabs));

    // Ejecutamos la detección de cambios (dispara ngOnInit)
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.laboratorios.length).toBe(2);
    expect(component.laboratorios).toEqual(dummyLabs);
  });
});