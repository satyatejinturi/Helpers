import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-text-tag',
  standalone: true, 
  templateUrl: './input-text-tag.component.html',
  styleUrls: ['./input-text-tag.component.css']  // fix plural here
})
export class InputTextTagComponent {
  @Input() placeholder: string = "";
}
