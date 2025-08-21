import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() label: string = '';
  @Input() options: { value: string; label: string }[] = [];
  @Input() placeholder: string = 'Select';
  @Input() required: boolean = false;
  @Input() errorMessage: string = 'This field is necessary';
  @Input() onChange: (event: Event) => void = () => {};

  @ViewChild('dropdownWrapper') dropdownWrapper!: ElementRef;

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (this.dropdownWrapper && !this.dropdownWrapper.nativeElement.contains(event.target)) {
      // Ensure dropdown closes if open (not applicable for native select, but included for consistency)
    }
  }
}
