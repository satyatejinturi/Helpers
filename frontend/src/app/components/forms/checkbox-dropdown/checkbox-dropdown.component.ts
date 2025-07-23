  import { CommonModule } from '@angular/common';
  import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

  @Component({
    selector: 'app-checkbox-dropdown',
    standalone:true,
    imports:[CommonModule],
    templateUrl: './checkbox-dropdown.component.html',
    styleUrls: ['./checkbox-dropdown.component.scss']
  })
  export class CheckboxDropdownComponent implements OnChanges {
    @Input() header:string="";
    @Input() label: string = 'Select';
    @Input() options: string[] = [];
    @Input() selected: string[] = [];
    @Input() displayLimit: number = 5;     
    @Input() maxSelection: number = 3;       

    @Output() selectedChange = new EventEmitter<string[]>();

    isOpen = false;
    visibleOptions: string[] = [];

    ngOnChanges(): void {
      this.updateVisibleOptions();
    }

    toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) this.updateVisibleOptions();
    }

    toggleOption(option: string) {
      const index = this.selected.indexOf(option);
      if (index >= 0) {
        this.selected.splice(index, 1);
      } else if (this.selected.length < this.maxSelection) {
        this.selected.push(option);
      }
      this.selectedChange.emit([...this.selected]);
      this.updateVisibleOptions();
    }

    isChecked(option: string): boolean {
      return this.selected.includes(option);
    }

    isDisabled(option: string): boolean {
      return !this.isChecked(option) && this.selected.length >= this.maxSelection;
    }

    updateVisibleOptions() {
      const all = [...this.selected, ...this.options];
      const deduplicated = Array.from(new Set(all));
      const selectedSet = new Set(this.selected);
      const unselected = deduplicated.filter(opt => !selectedSet.has(opt));
      const result = [...this.selected, ...unselected.slice(0, Math.max(0, this.displayLimit - this.selected.length))];
      this.visibleOptions = result;
    }

    toggleSelectAll() {
      const allToSelect = this.visibleOptions.slice(0, this.maxSelection);
      const alreadySelected = this.selected.filter(opt => allToSelect.includes(opt));

      if (alreadySelected.length === allToSelect.length) {
        // Deselect all visible options
        this.selected = this.selected.filter(opt => !allToSelect.includes(opt));
      } else {
        // Select as many as possible from visible options
        const remaining = this.maxSelection - this.selected.length;
        const toAdd = allToSelect.filter(opt => !this.selected.includes(opt)).slice(0, remaining);
        this.selected = [...this.selected, ...toAdd];
      }

      this.selectedChange.emit([...this.selected]);
      this.updateVisibleOptions();
    }

    isAllVisibleSelected(): boolean {
      return this.visibleOptions
        .filter(opt => this.selected.includes(opt))
        .length === Math.min(this.visibleOptions.length, this.maxSelection);
    }
    resetSelection() {
      this.selected = [];
      this.selectedChange.emit([]);
      this.updateVisibleOptions();
    }

    getSelectedLabel(): string {
      if (!this.selected || this.selected.length === 0) {
        return this.label; 
      }

      const displayLimit = 2;
      const selectedCount = this.selected.length;

      if (selectedCount <= displayLimit) {
        return this.selected.join(', ');
      }

      const shown = this.selected.slice(0, displayLimit).join(', ');
      const remaining = selectedCount - displayLimit;
      return `${shown} +${remaining} more`;
    }


  }
