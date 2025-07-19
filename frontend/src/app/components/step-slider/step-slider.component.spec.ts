import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSliderComponent } from './step-slider.component';

describe('StepSliderComponent', () => {
  let component: StepSliderComponent;
  let fixture: ComponentFixture<StepSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
