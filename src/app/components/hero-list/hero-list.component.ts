import { Component, input } from '@angular/core';
import { HeroItemComponent } from '../hero-item/hero-item.component';
import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change.interface';

@Component({
  selector: 'app-hero-list',
  imports: [HeroItemComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent {

  public heroes = input.required<Hero[]>();

  public savePowerstats({hero, powerstat, value}: HeroPowerstatsChange): void  {
    hero.powerstats[powerstat] += value;
  }
  
}
