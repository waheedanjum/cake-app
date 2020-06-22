
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cake } from '../classes/cake';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CakeService {

  apiUrl: string = 'http://localhost:3000/cakes';

  constructor(private http: HttpClient) { }

    getCakes(): Observable<Cake[]> {
      return this.http.get<Cake[]>(this.apiUrl);
    }

    getCakeById(id: number): Observable<Cake> {
      return this.http.get<Cake>(this.apiUrl + '/' + id);
    }

    updateCakeById(cake: Cake): Observable<Cake> {
      return this.http.put<Cake>(this.apiUrl + '/' + cake.id, cake);
    }
  
}
