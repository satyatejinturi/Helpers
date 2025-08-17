import { Component, Input, ViewChild, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-dropdown',
  templateUrl: './checkbox-dropdown.component.html',
  styles: []
})
export class CheckboxDropdownComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() label: string = '';
  @Input() options: { value: string; label: string }[] = [];
  @Input() maxSelection: number = 3;
  @Input() displayLimit: number = 5;
  @Input() maxHeight: string = '130px';
  @Input() required: boolean = false;
  @Input() showReset: boolean = true;
  @Input() hint: string = 'Select all applicable options.';
  @Input() errorMessage: string = 'This field is necessary';
  @Output() selectionChange = new EventEmitter<string[]>();

  @ViewChild('dropdownWrapper') dropdownWrapper!: ElementRef;

  isDropdownOpen = false;
  touched = false;
  visibleOptions: { value: string; label: string }[] = [];
  selectedValues: string[] = [];

  ngOnInit() {
    // Initialize selected values from form control
    this.selectedValues = this.formGroup.get(this.controlName)?.value || [];
    this.updateVisibleOptions();
    this.formGroup.get(this.controlName)?.valueChanges.subscribe(value => {
      this.selectedValues = value || [];
      this.updateVisibleOptions();
      this.selectionChange.emit(this.selectedValues);
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.updateVisibleOptions();
    } else {
      this.touched = true;
    }
  }

  toggleOption(value: string) {
    const index = this.selectedValues.indexOf(value);
    if (index >= 0) {
      this.selectedValues.splice(index, 1);
    } else if (this.selectedValues.length < this.maxSelection) {
      this.selectedValues.push(value);
    }
    this.formGroup.get(this.controlName)?.setValue(this.selectedValues);
    this.updateVisibleOptions();
  }

  updateVisibleOptions() {
    const all = [...this.selectedValues, ...this.options.map(opt => opt.value)];
    const deduped = Array.from(new Set(all));
    const selectedSet = new Set(this.selectedValues);
    const unselected = deduped.filter(val => !selectedSet.has(val));
    const result = [
      ...this.selectedValues,
      ...unselected.slice(0, Math.max(0, this.displayLimit - this.selectedValues.length))
    ].map(value => this.options.find(opt => opt.value === value)!);
    this.visibleOptions = result;
  }

  isChecked(value: string): boolean {
    return this.selectedValues.includes(value);
  }

  isDisabled(value: string): boolean {
    return !this.isChecked(value) && this.selectedValues.length >= this.maxSelection;
  }

  toggleSelectAll() {
    const allToSelect = this.visibleOptions.slice(0, this.maxSelection).map(opt => opt.value);
    const alreadySelected = this.selectedValues.filter(val => allToSelect.includes(val));
    if (alreadySelected.length === allToSelect.length) {
      this.selectedValues = this.selectedValues.filter(val => !allToSelect.includes(val));
    } else {
      const remaining = this.maxSelection - this.selectedValues.length;
      const toAdd = allToSelect.filter(val => !this.selectedValues.includes(val)).slice(0, remaining);
      this.selectedValues = [...this.selectedValues, ...toAdd];
    }
    this.formGroup.get(this.controlName)?.setValue(this.selectedValues);
    this.updateVisibleOptions();
  }

  isAllSelected(): boolean {
    return this.visibleOptions.filter(opt => this.selectedValues.includes(opt.value)).length === Math.min(this.visibleOptions.length, this.maxSelection);
  }

  reset() {
    this.selectedValues = [];
    this.formGroup.get(this.controlName)?.setValue(this.selectedValues);
    this.updateVisibleOptions();
  }

  getLabel(): string {
    if (!this.selectedValues.length) return this.label;
    if (this.selectedValues.length === 1) return this.options.find(opt => opt.value === this.selectedValues[0])?.label || this.label;
    return `${this.options.find(opt => opt.value === this.selectedValues[0])?.label} +${this.selectedValues.length - 1} more`;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (
      this.isDropdownOpen &&
      this.dropdownWrapper &&
      !this.dropdownWrapper.nativeElement.contains(event.target)
    ) {
      this.isDropdownOpen = false;
      this.touched = true;
    }
  }
}