import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let router: Router;
  const eventSubject = new Subject<any>(); 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, 
        RouterTestingModule, 
        NavbarComponent, 
        HttpClientTestingModule
      ],
      // Mockeamos el router.events para controlarlo nosotros
      providers: [
        { 
          provide: Router, 
          useValue: { 
            events: eventSubject.asObservable(), 
            navigate: jasmine.createSpy('navigate') 
          } 
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('debería crear la aplicación', () => {
    expect(app).toBeTruthy();
  });

  it('debería ocultar navbar en /login', () => {
    eventSubject.next(new NavigationEnd(1, '/login', '/login'));
    expect(app.showNavbar).toBeFalse();
  });

  it('debería mostrar navbar en /laboratorios', () => {
    eventSubject.next(new NavigationEnd(1, '/laboratorios', '/laboratorios'));
    expect(app.showNavbar).toBeTrue();
  });
});