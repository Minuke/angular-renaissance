import { Component, computed, inject, input, output, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero } from '../../shared/interfaces/hero.interface';
import { heroNameValidator } from '../../shared/validators/hero-name.validator';
import { TitleCasePipe } from '@angular/common';
import { HeroService } from '../../shared/services/hero.service';

@Component({
  selector: 'app-hero-form',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
})
export class HeroFormComponent {
  // ---- Private Dependencies ----
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _heroService = inject(HeroService);
    
  // ---- Input ----
  public hero = input<Hero>(this._heroService.defaultHero);
  // ---- Output ----
  public add = output<Hero>({ alias: 'sendHero' });

  // ---- Public Properties ----
  public message:string = '';
  public textButton = computed(() => this._heroService.isDefaultHero(this.hero()) ? 'Create' : 'Update');
  public powerstats:string[] = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];

  // ---- Form Definition ----
  public heroForm: Signal<FormGroup>;

  // ---- Public Constructor ----
  constructor() {
    this.heroForm = computed(() => this._formBuilder.group({
      name: [this.hero().name, Validators.required, heroNameValidator],
      image: [this.hero().image],
      alignment: [this.hero().alignment],
      powerstats: this._formBuilder.group({
        intelligence: [this.hero().powerstats.intelligence, [Validators.required, Validators.max(100), Validators.min(0)]],
        strength: [this.hero().powerstats.strength, [Validators.required, Validators.max(100), Validators.min(0)]],
        speed: [this.hero().powerstats.speed, [Validators.required, Validators.max(100), Validators.min(0)]],
        durability: [this.hero().powerstats.durability, [Validators.required, Validators.max(100), Validators.min(0)]],
        power: [this.hero().powerstats.power, [Validators.required, Validators.max(100), Validators.min(0)]],
        combat: [this.hero().powerstats.combat, [Validators.required, Validators.max(100), Validators.min(0)]],
      }),
    }));
  }

  // ---- Public Methods ----
  public addHero(): void {
    if (this.heroForm().invalid) {
      this.message = 'Please correct all errors and resubmit the form';
    } else {
      const hero: Hero = {
        id: this.hero().id,
        ...this.heroForm().value,
        powerstats: { ...this.heroForm().value.powerstats },
      };
      console.log('Creating Hero', hero);
      this.add.emit(hero);
    }
  }
}