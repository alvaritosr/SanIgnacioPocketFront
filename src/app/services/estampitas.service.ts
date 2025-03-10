import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Estampitas } from '../model/estampitas';

@Injectable({
  providedIn: 'root'
})
export class EstampitasService {
  private apiUrl = 'https://sanignaciopocket.onrender.com/api/estampitas/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Estampitas[]> {
    return this.http.get<Estampitas[]>(this.apiUrl);
  }

  getRandomFour(): Observable<Estampitas[]> {
    return this.getAll().pipe(
      map(estampitas => {
        const shuffled = this.shuffle(estampitas);
        return shuffled.slice(0, 4);
      })
    );
  }

  private shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
