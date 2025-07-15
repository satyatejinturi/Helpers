import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextTagComponent } from './input-text-tag.component';

describe('InputTextTagComponent', () => {
  let component: InputTextTagComponent;
  let fixture: ComponentFixture<InputTextTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputTextTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
