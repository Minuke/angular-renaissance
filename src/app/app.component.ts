import { Component, inject } from '@angular/core';
import { HeroItemComponent } from './components/hero-item/hero-item.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroNewComponent } from './components/hero-new/hero-new.component';
import { Hero } from './shared/interfaces/hero.interface';
import { HeroService } from './shared/services/hero.service';

@Component({
  selector: 'app-root',
  imports: [HeroListComponent, HeroNewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private readonly _heroService = inject(HeroService);

  public heroes:Hero[] = this._heroService.findAll();

  public addHero(hero: Hero): void {
    this._heroService.add(hero);
  }
}
