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

  private readonly _heroService = inject(HeroService);
  private readonly _destroyRef = inject(DestroyRef);
  public heroes$ = this._heroService.heroe$;

  constructor() {
    this._heroService.load().pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
  }
  
}
