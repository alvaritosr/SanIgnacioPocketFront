import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Puntuaciones } from '../model/puntuaciones';
import { HttpClient } from '@angular/common/http';

@Injectable
({
  providedIn: 'root'
})

export class PuntuacionesService
{
  constructor(private http: HttpClient) { }

  getAll(): Observable<Puntuaciones[]>
  {
    return this.http.get<Puntuaciones[]>(`api/puntuaciones/`);
  }

  guardar(puntuaciones: Puntuaciones): Observable<Puntuaciones>
  {
    return this.http.post<Puntuaciones>(`api/puntuaciones/guardar`, puntuaciones);
  }
}
