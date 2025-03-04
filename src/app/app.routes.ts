import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'sobres',
    loadComponent: () => import('./sobres/sobres.component').then((m) => m.SobresComponent),
  },
  {
    path: 'puntuaciones',
    loadComponent: () => import('./puntuaciones/puntuaciones.component').then((m) => m.PuntuacionesComponent),
  },
];
