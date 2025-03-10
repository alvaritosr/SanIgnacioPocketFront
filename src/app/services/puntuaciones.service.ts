import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Puntuaciones } from '../model/puntuaciones';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionesService {
  private apiUrl = 'https://sanignaciopocket.onrender.com/api/puntuaciones/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Puntuaciones[]> {
    return this.http.get<Puntuaciones[]>(this.apiUrl);
  }

  guardar(puntuaciones: Puntuaciones): Observable<Puntuaciones> {
    return this.http.post<Puntuaciones>(`${this.apiUrl}guardar`, puntuaciones);
  }
}
