import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-step-slider',
  templateUrl: './step-slider.component.html',
  styleUrls: ['./step-slider.component.scss']
})
export class StepSliderComponent {
  @Input() currentStep: number = 1;
  @Input() steps = [1, 2, 3];
  @Input() stepLabels: string[] = ['Documents & Details', 'Additional Docs', 'Review'];


  @Input() isEditMode: boolean = false;
  @Output() editStepSelected = new EventEmitter<number>(); 
}
