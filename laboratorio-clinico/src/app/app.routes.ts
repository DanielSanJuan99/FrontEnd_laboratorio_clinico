import { Routes } from '@angular/router';
import { UsuarioListComponent } from './features/usuarios/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './features/usuarios/usuario-form/usuario-form.component';
import { LabListComponent } from './features/laboratorios/lab-list/lab-list.component';
import { LabFormComponent } from './features/laboratorios/lab-form/lab-form.component';
import { ResultadosListComponent } from './features/resultados/resultados-list/resultados-list.component';
import { ResultadosFormComponent } from './features/resultados/resultados-form/resultados-form.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Ruta de Login
  { path: 'login', component: LoginComponent },

  // Rutas de Usuarios
  { path: 'usuarios', component: UsuarioListComponent, canActivate: [authGuard] },
  { path: 'usuarios/crear', component: UsuarioFormComponent, canActivate: [authGuard] },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent, canActivate: [authGuard] },

  // Rutas de Laboratorios
  { path: 'laboratorios', component: LabListComponent, canActivate: [authGuard] },
  { path: 'laboratorios/crear', component: LabFormComponent, canActivate: [authGuard] },
  { path: 'laboratorios/editar/:id', component: LabFormComponent, canActivate: [authGuard] },

  // Rutas de Resultados
  { path: 'resultados', component: ResultadosListComponent, canActivate: [authGuard] },
  { path: 'resultados/crear', component: ResultadosFormComponent, canActivate: [authGuard] },
  { path: 'resultados/editar/:id', component: ResultadosFormComponent, canActivate: [authGuard] },

  // Ruta por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Ruta para manejar rutas no definidas
  { path: '**', redirectTo: 'login' }
];