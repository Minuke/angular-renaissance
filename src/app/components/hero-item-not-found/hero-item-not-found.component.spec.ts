import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroItemNotFoundComponent } from './hero-item-not-found.component';

describe('HeroItemNotFoundComponent', () => {
  let component: HeroItemNotFoundComponent;
  let fixture: ComponentFixture<HeroItemNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroItemNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroItemNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
