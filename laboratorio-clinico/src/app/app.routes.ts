import { Routes } from '@angular/router';
import { UsuarioListComponent } from './features/usuarios/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './features/usuarios/usuario-form/usuario-form.component';
import { LabListComponent } from './features/laboratorios/lab-list/lab-list.component';
import { LabFormComponent } from './features/laboratorios/lab-form/lab-form.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  // Ruta de Login
  { path: 'login', component: LoginComponent },

  // Rutas de Usuarios
  { path: 'usuarios', component: UsuarioListComponent },
  { path: 'usuarios/crear', component: UsuarioFormComponent },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent },

  // Rutas de Laboratorios (Haz lo mismo con tus componentes de lab)
  { path: 'laboratorios', component: LabListComponent },
  { path: 'laboratorios/crear', component: LabFormComponent },
  { path: 'laboratorios/editar/:id', component: LabFormComponent },

  // Ruta por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Ruta para manejar rutas no definidas
  { path: '**', redirectTo: 'login' }
];