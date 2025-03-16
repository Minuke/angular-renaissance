import { Observable } from "rxjs";
import { Hero, PowerStats } from "../interfaces/hero.interface";

export abstract class HeroServiceAbstract {
  protected readonly API_ENDPOINT = "http://localhost:3000/data";

  public readonly defaultHero: Hero = {
    id: Math.floor(Math.random() * 1000) + 1000,
    name: "Joker",
    image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/370-joker.jpg",
    alignment: "bad",
    powerstats: {
      intelligence: 100,
      strength: 10,
      speed: 12,
      durability: 60,
      power: 43,
      combat: 70,
    }
  }
  
  public readonly NullHero: Hero = {
    id: Math.floor(Math.random() * 1000) + 1000,
    name: "Not Found",
    image: "./assets/img/not-found.png",
    alignment: "bad",
    powerstats: {
      intelligence: -1,
      strength: -1,
      speed: -1,
      durability: -1,
      power: -1,
      combat: -1,
    }

  }

  public isDefaultHero(hero: Hero): boolean {
    return hero.id === this.defaultHero.id
  }
  
  public isNullHero(hero: Hero): boolean {
    return hero.id === this.NullHero.id
  }

  abstract load(cache?: boolean): Observable<{ heroes: Hero[]; total: number }>;
  abstract add(hero: Partial<Hero>): Observable<Hero>;
  abstract update(heroToUpdate: Hero): Observable<Hero>;
  abstract remove(hero: Hero): Observable<Hero>;
  abstract updatePowerstat(hero: Hero, powerstat: keyof PowerStats, value: number): Observable<Hero>;
  abstract findAll(params?: { page: number; limit: number }): Observable<{ heroes: Hero[]; total: number }>;
  abstract findOne(id: number): Observable<Hero>;

}