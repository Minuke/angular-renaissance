import { inject, Injectable } from '@angular/core';
import { Hero, PowerStat, PowerStats } from '../interfaces/hero.interface';
import { HeroServiceAbstract } from './hero.service.abstract';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService extends HeroServiceAbstract {

  private readonly _httpClient = inject(HttpClient);
  
  public load(): Observable<{ heroes: Hero[], total: number }> {
    return this._httpClient.get<{ heroes: Hero[], total: number }>(this.API_ENDPOINT).pipe(
      catchError((error) => {
        console.log("Error loading heroes", error);
        return throwError(() => error)
      })
    );
  }

  public add(hero: Hero): Observable<Hero> {
    return this._httpClient.post<Hero>(this.API_ENDPOINT, hero).pipe(
      catchError((error) => {
        console.log("Error loading heroes", error);
        return throwError(() => error)
      })
    )
  }

  public updatePowerstat(hero: Hero, powerstat: keyof PowerStats, value: number): Observable<Hero> {
    const heroToUpdate = {
          ...hero,
          powerstats: {
            ...hero.powerstats,
            [powerstat]: hero.powerstats[powerstat] + value
          },  };
    return this.update(heroToUpdate);
  }

  public update(heroToUpdate: Hero): Observable<Hero> {
    return this._httpClient.put<Hero>(`${this.API_ENDPOINT}/${heroToUpdate.id}`, heroToUpdate).pipe(
      catchError((error) => {
        console.log("Error loading heroes", error);
        return throwError(() => error)
      })
    )
  }
  public remove(hero: Hero) {
    return this._httpClient.delete<Hero>(`${this.API_ENDPOINT}/${hero.id}`).pipe(
      tap(console.log),
      catchError((error) => {
        console.error('Error deleting hero', error);
        return throwError(() => error);
      })
    );
  }

  public findAll({ page, limit } = { page: 1, limit: 600 }): Observable<{ heroes: Hero[]; total: number }> {
    return this._httpClient.get<{ heroes: Hero[]; total: number }>(
      `${this.API_ENDPOINT}?_page=${page}&_limit=${limit}`
    );
  }
  public findOne(id: number): Observable<Hero> {
    return this._httpClient.get<Hero>(`${this.API_ENDPOINT}/${id}`).pipe(
      catchError((error) => {
        console.log("Error loading heroes", error);
        return throwError(() => error)
      })
    )
  }

}
