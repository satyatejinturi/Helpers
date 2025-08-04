import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-helper-card',

  templateUrl: './helper-card.component.html',
  styleUrl: './helper-card.component.css'
})
export class HelperCardComponent {
  @Input() helper: any;
}
