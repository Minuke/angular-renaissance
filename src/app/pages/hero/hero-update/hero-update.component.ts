import { Component, inject } from '@angular/core';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { Router } from '@angular/router';
import { HeroService } from '../../../shared/services/hero.service';

@Component({
  selector: 'app-hero-update',
  imports: [HeroFormComponent],
  templateUrl: './hero-update.component.html',
  styleUrl: './hero-update.component.scss'
})
export class HeroUpdateComponent {

  private readonly _heroSerivce = inject(HeroService);
  private readonly _router = inject(Router);

  updateHero(_hero: Hero) {
    const hero: Hero = {
      ..._hero,
      id: Math.floor(Math.random() * 1000) + 1,   
    }
    console.log("Updating Hero", hero);
    this._router.navigate(['/home']); 
  }
}
