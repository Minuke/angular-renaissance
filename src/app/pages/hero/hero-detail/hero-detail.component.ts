import { Component, computed, inject, input, numberAttribute, OnChanges } from '@angular/core';
import { HeroItemComponent } from '../../../components/hero-item/hero-item.component';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroService } from '../../../shared/services/hero.service';
import { HeroItemNotFoundComponent } from '../../../components/hero-item-not-found/hero-item-not-found.component';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  imports: [HeroItemComponent, HeroItemNotFoundComponent, AsyncPipe],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent implements OnChanges {

  id = input(0, { transform: numberAttribute });

  private readonly _heroService = inject(HeroService);

  hero$: Observable<Hero> = of();

  ngOnChanges(){
    this.hero$ = this._heroService.findOne(this.id());
  }

  // public hero = computed<Hero>(() => this._heroService.findOne(this.id()));


  // public isValidHero = computed(() => !this._heroService.isNullHero(this.hero()));
} 
