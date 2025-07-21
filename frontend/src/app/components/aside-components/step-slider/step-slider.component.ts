import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-step-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-slider.component.html',
  styleUrl: './step-slider.component.css'
})
export class StepSliderComponent{
  @Input() currentStep :number= 1;
  @Input() steps = [1, 2, 3]; 
  @Input() stepLabels: string[] = ['Documents & Details', 'Additional Docs', 'Review'];
}
