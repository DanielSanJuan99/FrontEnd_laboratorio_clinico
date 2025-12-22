import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/laboratorios">
          <i class="bi bi-hospital"></i> Lab Clínico
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li class="nav-item">
              <a class="nav-link" routerLink="/usuarios" routerLinkActive="active">
                <i class="bi bi-people"></i> Usuarios
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" routerLink="/laboratorios" routerLinkActive="active">
                <i class="bi bi-building"></i> Laboratorios
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" routerLink="/resultados" routerLinkActive="active">
                <i class="bi bi-file-earmark-medical"></i> Resultados
              </a>
            </li>

          </ul>
          
          <div class="d-flex">
            <button class="btn btn-outline-light btn-sm" (click)="logout()">
              <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar { box-shadow: 0 2px 4px rgba(0,0,0,.1); }
    .active { font-weight: bold; color: #fff !important; }
  `]
})
export class NavbarComponent {
  
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  logout() {
    this.authService.logout(); // Borra el token
    this.router.navigate(['/login']); // Manda al login
  }
}