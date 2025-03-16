import { ReactiveFormsModule } from '@angular/forms';
import { Component, DestroyRef, inject } from '@angular/core';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroService } from '../../../shared/services/hero.service';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-hero-new',
  imports: [HeroFormComponent],
  templateUrl: './hero-new.component.html',
  styleUrl: './hero-new.component.scss'
})
export class HeroNewComponent {

  private readonly _heroSerivce = inject(HeroService);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  addHero(hero: Hero) {
    console.log("Creating Hero", hero);
    this._heroSerivce.add(hero)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (hero) => console.log("Hero created", hero),
      error: (error) => console.log("Error creating hero", error),
      complete: () => console.log("Hero creation completed"),
    });
    this._router.navigate(['/home']);
  }
}
