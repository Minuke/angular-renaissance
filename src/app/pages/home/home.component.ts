import { Component, inject } from '@angular/core';
import { HeroListComponent } from '../../components/hero-list/hero-list.component';
import { HeroService } from '../../shared/services/hero.service';
import { Hero } from '../../shared/interfaces/hero.interface';

@Component({
  selector: 'app-home',
  imports: [HeroListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private readonly _heroService = inject(HeroService);
  public heroes: Hero[] = this._heroService.findAll();
  
}
