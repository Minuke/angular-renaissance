import { Injectable } from '@angular/core';
import { Hero, PowerStat } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public heroes: Hero[] = [
    {
      id: 620,
      name: "Spider-Man",
      powerstats: {
        intelligence: 90,
        strength: 55,
        speed: 67,
        durability: 75,
        power: 74,
        combat: 85
      },
      image: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/620-spider-man.jpg',
      alignment: "good",
    },
    {
      id: 225,
      name: "Doctor Octopus",
      powerstats: {
        intelligence: 94,
        strength: 48,
        speed: 33,
        durability: 40,
        power: 53,
        combat: 65
      },
      image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/225-doctor-octopus.jpg",
      alignment: "bad",
    },
    {
      id: 70,
      name: "Batman",
      powerstats: {
        intelligence: 100,
        strength: 26,
        speed: 27,
        durability: 50,
        power: 47,
        combat: 100
      },
      image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/70-batman.jpg",
      alignment: "good",
    },
  ];

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
  
  public add(hero: Hero): void {
    this.heroes.push(hero);
  }

  public updatePowerstat(hero: Hero, powerstat: PowerStat, value: number): void {
    hero.powerstats[powerstat] += value;
  }

  public update(heroToUpdate: Hero) {
    console.log(heroToUpdate)
    this.heroes = this.heroes.map(hero => hero.id === heroToUpdate.id ? heroToUpdate: hero);
  }
  public remove(hero: Hero){
    const index = this.heroes.findIndex(_hero => _hero.id === hero.id);
    if(index !== -1){
      this.heroes.splice(index, 1);
    }
  }

  public findAll(): Hero[] {
    return this.heroes;
  }
  public findOne(id: number): Hero {
    return this.heroes.find((hero) => hero.id === id) || this.NullHero;
  }

  public isDefaultHero(hero: Hero): boolean {
    return hero.id === this.defaultHero.id
  }

  public isNullHero(hero: Hero): boolean {
    return hero.id === this.NullHero.id
  }
  
}
