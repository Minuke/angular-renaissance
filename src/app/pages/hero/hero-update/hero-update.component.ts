import { Component, computed, DestroyRef, inject } from '@angular/core';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../../shared/services/hero.service';
import { HeroItemNotFoundComponent } from '../../../components/hero-item-not-found/hero-item-not-found.component';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-hero-update',
  imports: [HeroFormComponent, HeroItemNotFoundComponent],
  templateUrl: './hero-update.component.html',
  styleUrl: './hero-update.component.scss'
})
export class HeroUpdateComponent {

  private readonly _heroSerivce = inject(HeroService);
  private readonly _router = inject(Router);
  private readonly _activatedRouter = inject(ActivatedRoute);
  private readonly _destroyRef = inject(DestroyRef);

  public hero: Hero = this._activatedRouter.snapshot.data['hero'];
  public isValidHero = computed(() => !this._heroSerivce.isNullHero(this.hero))

  updateHero(hero: Hero) {
    console.log("Updating Hero", hero);
    this._heroSerivce.update(hero)
    .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (hero) => console.log("Hero updated", hero),
          error: (error) => console.log("Error updating hero", error),
          complete: () => console.log("Hero update completed"),
        });;
    this._router.navigate(['/home']); 
  }
}
