import { Component, computed, effect, inject, input, numberAttribute, OnChanges, signal, DestroyRef } from '@angular/core';
import { HeroItemComponent } from '../../../components/hero-item/hero-item.component';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroService } from '../../../shared/services/hero.service';
import { HeroItemNotFoundComponent } from '../../../components/hero-item-not-found/hero-item-not-found.component';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-detail',
  imports: [HeroItemComponent, HeroItemNotFoundComponent, AsyncPipe],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent {

  id = input(0, { transform: numberAttribute });

  private readonly _heroService = inject(HeroService);

  hero = signal<Hero>(this._heroService.NullHero)

  constructor(private destroyRef: DestroyRef) {
    effect(() => {
      this._heroService.findOne(this.id()).pipe(
        takeUntilDestroyed(destroyRef)
      ).subscribe({
        next: (_hero) => this.hero.set(_hero),
      });
    });
  }
} 
