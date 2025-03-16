import { Component, computed, input, output } from '@angular/core';
import { Hero, PowerStat } from '../../shared/interfaces/hero.interface';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss'] // Corrección: styleUrls (array)
})
export class HeroItemComponent {

  public hero = input.required<Hero>();
  // Renombrado correctamente a powerstatsChange
  public powerstatsChange = output<HeroPowerstatsChange>();
  public removeHero = output<Hero>();
  
  public isHeroVillain = computed(() => this.hero().alignment === 'bad');

  decrementPowerStats(powerstat: PowerStat): void {
    this.powerstatsChange.emit({ hero: this.hero(), powerstat, value: -1 });
  }

  incrementPowerStats(powerstat: PowerStat): void {
    this.powerstatsChange.emit({ hero: this.hero(), powerstat, value: +1 });
  }

  public remove(hero: Hero): void {
    this.removeHero.emit(hero);
  }

  // Función trackBy para el *ngFor del keyvalue pipe
  trackByKey(index: number, item: { key: string; value: any }): string {
    return item.key;
  }
}
