import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadosListComponent } from './resultados-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ResultadoService } from '../../../services/resultado.service';
import { of, throwError } from 'rxjs';

describe('ResultadosListComponent', () => {
  let component: ResultadosListComponent;
  let fixture: ComponentFixture<ResultadosListComponent>;
  let service: ResultadoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadosListComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [ResultadoService]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadosListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ResultadoService);
  });

  it('debería cargar resultados al inicio', () => {
    spyOn(service, 'listarResultados').and.returnValue(of([]));
    fixture.detectChanges();
    expect(component.resultados).toEqual([]);
  });

  it('debería eliminar si se confirma', () => {
    spyOn(globalThis, 'confirm').and.returnValue(true);
    spyOn(service, 'eliminarResultado').and.returnValue(of(undefined));
    const reloadSpy = spyOn(component, 'cargarResultados');
    
    component.eliminar(1);
    expect(reloadSpy).toHaveBeenCalled();
  });

  it('NO debería eliminar si se cancela', () => {
    spyOn(globalThis, 'confirm').and.returnValue(false);
    const spy = spyOn(service, 'eliminarResultado');
    component.eliminar(1);
    expect(spy).not.toHaveBeenCalled();
  });
});