import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortdialogComponent } from './sortdialog.component';

describe('SortdialogComponent', () => {
  let component: SortdialogComponent;
  let fixture: ComponentFixture<SortdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortdialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
