import { inject, Injectable } from '@angular/core';
import { Hero, PowerStat, PowerStats } from '../interfaces/hero.interface';
import { HeroServiceAbstract } from './hero.service.abstract';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService extends HeroServiceAbstract {

  private readonly _heroSubject = new BehaviorSubject<Hero[]>([]);
  public readonly heroe$ = this._heroSubject.asObservable();

  private readonly _httpClient = inject(HttpClient);
  
  public load(): Observable<{ heroes: Hero[], total: number }> {
    return this._httpClient.get<{ heroes: Hero[], total: number }>(this.API_ENDPOINT).pipe(
      tap(result => this._heroSubject.next(result.heroes)),
      catchError((error) => {
        console.log("Error loading heroes", error);
        return throwError(() => error)
      })
    );
  }

  public add(hero: Hero): Observable<Hero> {
    return this._httpClient.post<Hero>(this.API_ENDPOINT, hero).pipe(
      tap(newHero => {
        const currentHeroes = this._heroSubject.getValue();
        this._heroSubject.next([...currentHeroes, newHero]);
      }),
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
      tap(heroToUpdate => {
        const currentHeroes = this._heroSubject.getValue();
        const updatedHeroes = currentHeroes.map((hero) => hero.id === heroToUpdate.id ? heroToUpdate : hero);
        this._heroSubject.next(updatedHeroes);
      }),
      catchError((error) => {
        console.log("Error loading heroes", error);
        return throwError(() => error)
      })
    )
  }
  public remove(hero: Hero) {
    const { id } = hero;
    return this._httpClient.delete<Hero>(`${this.API_ENDPOINT}/${hero.id}`).pipe(
      tap(() => { 
        const updatedState = this._heroSubject.getValue().filter((hero) => hero.id !== id);
        this._heroSubject.next(updatedState);

      }),
      catchError((error) => {
        console.error('Error deleting hero', error);
        return throwError(() => error);
      })
    );
  }

  findAll({ page, limit } = { page: 1, limit: 600 }): Observable<{ heroes: Hero[]; total: number }> {
        return this._httpClient.get<{ heroes: Hero[]; total: number }>(
          `${this.API_ENDPOINT}?_page=${page}&_limit=${limit}`
        ).pipe(tap(result => this._heroSubject.next(result.heroes)));
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
