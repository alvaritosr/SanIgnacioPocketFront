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
    path: 'estampitas',
    loadComponent: () => import('./estampitas/estampitas.component').then((m) => m.EstampitasComponent),
  },
  {
    path: 'puntuaciones',
    loadComponent: () => import('./puntuaciones/puntuaciones.component').then((m) => m.PuntuacionesComponent),
  },
];
