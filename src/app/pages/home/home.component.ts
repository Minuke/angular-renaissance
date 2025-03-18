import { Component, DestroyRef, inject } from '@angular/core';
import { HeroListComponent } from '../../components/hero-list/hero-list.component';
import { HeroService } from '../../shared/services/hero.service';
import { Hero } from '../../shared/interfaces/hero.interface';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [HeroListComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  readonly #heroService = inject(HeroService);
  readonly heroes$ = this.#heroService.heroes;

  constructor(private destroyRef: DestroyRef) {
    this.#heroService.load()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
  
}
