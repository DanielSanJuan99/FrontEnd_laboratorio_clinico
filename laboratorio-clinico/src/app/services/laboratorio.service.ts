import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Laboratorio } from '../models/laboratorio';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  private key = 'my_app_laboratorios';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      if (!localStorage.getItem(this.key)) {
        localStorage.setItem(this.key, JSON.stringify([]));
      }
    }
  }

  private getLocalStorage(): Laboratorio[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  getAll(): Observable<Laboratorio[]> {
    return of(this.getLocalStorage());
  }

  getById(id: number): Observable<Laboratorio | undefined> {
    const labs = this.getLocalStorage();
    return of(labs.find(l => l.id === id));
  }

  create(lab: Laboratorio): Observable<Laboratorio> {
    const labs = this.getLocalStorage();
    lab.id = new Date().getTime(); 
    labs.push(lab);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.key, JSON.stringify(labs));
    }
    return of(lab);
  }

  update(id: number, lab: Laboratorio): Observable<Laboratorio> {
    let labs = this.getLocalStorage();
    const index = labs.findIndex(l => l.id === id);
    if (index !== -1) {
      lab.id = id;
      labs[index] = lab;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.key, JSON.stringify(labs));
      }
    }
    return of(lab);
  }

  delete(id: number): Observable<boolean> {
    let labs = this.getLocalStorage();
    const nuevosLabs = labs.filter(l => l.id !== id);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.key, JSON.stringify(nuevosLabs));
    }
    return of(true);
  }
}