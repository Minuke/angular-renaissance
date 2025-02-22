import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero } from '../../shared/interfaces/hero.interface';
import { heroNameValidator } from '../../shared/validators/hero-name.validator';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-hero-form',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
})
export class HeroFormComponent {
  // ---- Output ----
  public add = output<Hero>({ alias: 'sendHero' });

  // ---- Public Properties ----
  public message:string = '';
  public powerstats:string[] = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];

  // ---- Form Definition ----
  public heroForm: FormGroup;

  // ---- Private Dependencies ----
  private readonly _formBuilder = inject(FormBuilder);

  // ---- Public Constructor ----
  constructor() {
    this.heroForm = this._formBuilder.group({
      name: ['Joker', Validators.required, heroNameValidator],
      image: ['https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/370-joker.jpg'],
      alignment: ['bad'],
      powerstats: this._formBuilder.group({
        intelligence: [100, [Validators.required, Validators.max(100), Validators.min(0)]],
        strength: [10, [Validators.required, Validators.max(100), Validators.min(0)]],
        speed: [12, [Validators.required, Validators.max(100), Validators.min(0)]],
        durability: [60, [Validators.required, Validators.max(100), Validators.min(0)]],
        power: [43, [Validators.required, Validators.max(100), Validators.min(0)]],
        combat: [70, [Validators.required, Validators.max(100), Validators.min(0)]],
      }),
    });
  }

  // ---- Public Methods ----
  public addHero(): void {
    if (this.heroForm.invalid) {
      this.message = 'Please correct all errors and resubmit the form';
    } else {
      const hero: Hero = {
        id: Math.floor(Math.random() * 1000) + 1,
        ...this.heroForm.value,
        powerstats: { ...this.heroForm.value.powerstats },
      };
      console.log('Creating Hero', hero);
      this.add.emit(hero);
    }
  }
}