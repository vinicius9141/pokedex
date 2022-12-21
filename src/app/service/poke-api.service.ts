import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  constructor(private http: HttpClient) {}

  public listAllPokemons(init: Number, final: Number): Observable<any> {
    let api = `https://pokeapi.co/api/v2/pokemon/?offset=${init}&limit=${final}`;
    return this.http.get<any>(api).pipe(
      tap((res) => res),
      tap((res) => {
        res.results.map((resPokemons: any) => {
          this.apiGetPokemons(resPokemons.url).subscribe(
            (res) => (resPokemons.status = res)
          );
        });
      })
    );
  }
  public apiGetPokemons(url: string): Observable<any> {
    return this.http.get<any>(url).pipe();
  }
}
