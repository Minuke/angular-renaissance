import { Component, inject } from '@angular/core';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroService } from '../../../shared/services/hero.service';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-new',
  imports: [HeroFormComponent],
  templateUrl: './hero-new.component.html',
  styleUrl: './hero-new.component.scss'
})
export class HeroNewComponent {

  private readonly _heroSerivce = inject(HeroService);
  private readonly _router = inject(Router);

  addHero(hero: Hero) {
    console.log("Creating Hero", hero);
    this._heroSerivce.add(hero);
    this._router.navigate(['/home']);
  }
}
