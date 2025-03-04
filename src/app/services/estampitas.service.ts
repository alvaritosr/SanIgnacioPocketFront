import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estampitas } from '../model/estampitas';

@Injectable
({
  providedIn: 'root'
})

export class EstampitasService
{
  constructor(private http: HttpClient) { }

  getAll(): Observable<Estampitas[]>
  {
    return this.http.get<Estampitas[]>(`api/`);
  }
}
