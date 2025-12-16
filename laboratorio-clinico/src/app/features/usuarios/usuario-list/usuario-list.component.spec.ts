import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioListComponent } from './usuario-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioService } from '../../../services/usuario.service';
import { of } from 'rxjs';

describe('UsuarioListComponent', () => {
  let component: UsuarioListComponent;
  let fixture: ComponentFixture<UsuarioListComponent>;
  let service: UsuarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UsuarioListComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [UsuarioService]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UsuarioService);
  });

  it('debería cargar usuarios al iniciar', () => {
    const dummyUsers = [
      { id: 1, nombre: 'User 1', apellido: 'Test', email: 'test@test.com' }
    ];
    spyOn(service, 'obtenerUsuarios').and.returnValue(of(dummyUsers));

    fixture.detectChanges(); // Dispara ngOnInit

    expect(component.usuarios.length).toBe(1);
  });

  it('debería eliminar un usuario si se confirma el diálogo', () => {
    // 1. Simulamos que el usuario dice "SI" al confirm
    spyOn(window, 'confirm').and.returnValue(true);
    
    // 2. Simulamos la llamada al servicio de eliminar
    const deleteSpy = spyOn(service, 'eliminarUsuario').and.returnValue(of(void 0));
    
    // 3. Simulamos la recarga de usuarios después de borrar
    const loadSpy = spyOn(component, 'cargarUsuarios');

    // Acción
    component.eliminar(123);

    // Verificaciones
    expect(deleteSpy).toHaveBeenCalledWith(123);
    expect(loadSpy).toHaveBeenCalled();
  });

  it('NO debería eliminar si el usuario cancela el diálogo', () => {
    // Simulamos que el usuario dice "NO" (Cancelar)
    spyOn(window, 'confirm').and.returnValue(false);
    const deleteSpy = spyOn(service, 'eliminarUsuario');

    component.eliminar(123);

    expect(deleteSpy).not.toHaveBeenCalled();
  });
});