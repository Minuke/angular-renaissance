import { Component, inject, input } from '@angular/core';
import { HeroItemComponent } from '../hero-item/hero-item.component';
import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change.interface';
import { HeroService } from '../../shared/services/hero.service';

@Component({
  selector: 'app-hero-list',
  imports: [HeroItemComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent {

  private readonly _heroService = inject(HeroService);

  public heroes = input.required<Hero[]>();

  public savePowerstats({hero, powerstat, value}: HeroPowerstatsChange): void  {
    this._heroService.update(hero, powerstat, value);
  }
  
}
