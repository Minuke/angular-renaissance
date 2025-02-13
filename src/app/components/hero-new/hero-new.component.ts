import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero } from '../../shared/interfaces/hero.interface';

@Component({
  selector: 'app-hero-new',
  imports: [ReactiveFormsModule],
  templateUrl: './hero-new.component.html',
  styleUrl: './hero-new.component.scss'
})
export class HeroNewComponent {

  public add = output<Hero>();

  private readonly _formBuilder = inject(FormBuilder);

  public message = "";
  public heroForm: FormGroup = this._formBuilder.group({
    name: ['Joker', Validators.required],
    image: ["https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/370-joker.jpg"],
    alignment: ["bad"],
    powerstats: this._formBuilder.group({
      intelligence: [100, [Validators.required, Validators.max(100), Validators.min(0)]],
      strength: [10, [Validators.required, Validators.max(100), Validators.min(0)]],
      speed: [12, [Validators.required, Validators.max(100), Validators.min(0)]],
      durability: [60, [Validators.required, Validators.max(100), Validators.min(0)]],
      power: [43, [Validators.required, Validators.max(100), Validators.min(0)]],
      combat: [70, [Validators.required, Validators.max(100), Validators.min(0)]],
    })
  });

  public addHero(): void {
    if(this.heroForm.invalid) {
      this.message = "Please correct all errors and resubmit the form";
    } else {
      const hero: Hero = {
        id: Math.floor(Math.random() * 1000) + 1,
        ...this.heroForm.value,
        powerstats : { ...this.heroForm.value.powerstats }
      };
      console.log("Creating Hero", hero);
      this.add.emit(hero);
    }
  }
}
