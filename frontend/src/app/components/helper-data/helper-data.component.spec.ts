import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperDataComponent } from './helper-data.component';

describe('HelperDataComponent', () => {
  let component: HelperDataComponent;
  let fixture: ComponentFixture<HelperDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelperDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelperDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
