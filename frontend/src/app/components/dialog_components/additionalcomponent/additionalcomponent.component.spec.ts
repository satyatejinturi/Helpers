import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalcomponentComponent } from './additionalcomponent.component';

describe('AdditionalcomponentComponent', () => {
  let component: AdditionalcomponentComponent;
  let fixture: ComponentFixture<AdditionalcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalcomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionalcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
