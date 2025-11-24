import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Usuario } from '../models/usuario';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private key = 'my_app_usuarios';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Solo inicializamos si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      if (!localStorage.getItem(this.key)) {
        localStorage.setItem(this.key, JSON.stringify([]));
      }
    }
  }

  private getLocalStorage(): Usuario[] {
    // Si no estamos en el navegador, devolvemos un array vacío para no romper la app
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  getAll(): Observable<Usuario[]> {
    return of(this.getLocalStorage());
  }

  getById(id: number): Observable<Usuario | undefined> {
    const usuarios = this.getLocalStorage();
    const usuario = usuarios.find(u => u.id === id);
    return of(usuario);
  }

  create(usuario: Usuario): Observable<Usuario> {
    const usuarios = this.getLocalStorage();
    usuario.id = new Date().getTime(); 
    usuarios.push(usuario);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.key, JSON.stringify(usuarios));
    }
    return of(usuario);
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    let usuarios = this.getLocalStorage();
    const index = usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      usuario.id = id; 
      usuarios[index] = usuario;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.key, JSON.stringify(usuarios));
      }
    }
    return of(usuario);
  }

  delete(id: number): Observable<boolean> {
    let usuarios = this.getLocalStorage();
    const nuevosUsuarios = usuarios.filter(u => u.id !== id);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.key, JSON.stringify(nuevosUsuarios));
    }
    return of(true);
  }
}