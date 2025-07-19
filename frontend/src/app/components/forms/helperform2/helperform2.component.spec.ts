import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Helperform2Component } from './helperform2.component';

describe('Helperform2Component', () => {
  let component: Helperform2Component;
  let fixture: ComponentFixture<Helperform2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Helperform2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Helperform2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
