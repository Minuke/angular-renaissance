import { Component, computed, input, output } from '@angular/core';
import { Hero, PowerStat } from '../../shared/interfaces/hero.interface';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-item',
  imports: [CommonModule],
  templateUrl: './hero-item.component.html',
  styleUrl: './hero-item.component.scss'
})
export class HeroItemComponent {

  public hero = input.required<Hero>();
  public powertatsChange = output<HeroPowerstatsChange>()
  
  public isHeroVillain = computed(() => this.hero().alignment === 'bad');

  decrementPowerStats(powerstat: PowerStat): void {
    this.powertatsChange.emit({ hero: this.hero(), powerstat, value: -1 })
  }

  incrementPowerStats(powerstat: PowerStat): void {
    this.powertatsChange.emit({ hero: this.hero(), powerstat, value: +1 })
  }
  
}
