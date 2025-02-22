import { Component, inject } from '@angular/core';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroNewComponent } from './components/hero-new/hero-new.component';
import { Hero } from './shared/interfaces/hero.interface';
import { HeroService } from './shared/services/hero.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [HeroListComponent, HeroNewComponent, HeaderComponent, FooterComponent],
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
