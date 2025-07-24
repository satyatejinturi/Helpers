import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-slider.component.html',
  styleUrl: './step-slider.component.css'
})
export class StepSliderComponent {
  @Input() currentStep: number = 1;
  @Input() steps = [1, 2, 3];
  @Input() stepLabels: string[] = ['Documents & Details', 'Additional Docs', 'Review'];

  // NEW
  @Input() isEditMode: boolean = false;
  @Output() editStepSelected = new EventEmitter<number>(); // emits step number (1 or 2)
}
