import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperServiceService } from '../../shared/helper-service.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss'
})
export class PortalComponent implements OnInit {
  allhelper = this.helperservice.helper;
  selectedhelper: any = null;
  nofhelpers = 0;
  totalno = this.helperservice.totalnoofuser;
  showfilter = false;
  constructor(public helperservice: HelperServiceService,
    public router: Router,
    public dialog: MatDialog,) { }

  selectedServiceTypes: string[] = [];
  selectedOrganizations: string[] = [];
  searchText = '';
  sortOptions: { label: string; value: 'employeeid' | 'fullName' }[] = [
    { label: 'Employee ID', value: 'employeeid' },
    { label: 'Helper Name  (A-Z)', value: 'fullName' }
  ];
  dropdownOpen: 'services' | 'organizations' | null = null;
  allServiceTypes: string[] = [];
  allOrganizations: string[] = [];
  ngOnInit(): void {
    this.helperservice.getData();
    this.allServiceTypes = this.helperservice.getAllServiceTypes();
    this.allOrganizations = this.helperservice.getAllOrganizations();
  }
  toggleDropdown(type: 'services' | 'organizations') {
    this.dropdownOpen = this.dropdownOpen === type ? null : type;
  }
  toggleOption(option: string, type: 'services' | 'organizations') {
    const targetArray = type === 'services' ? this.selectedServiceTypes : this.selectedOrganizations;
    const index = targetArray.indexOf(option);
    if (index >= 0) {
      targetArray.splice(index, 1);
    } else {
      targetArray.push(option);
    }
    this.selectedServiceTypes = [...this.selectedServiceTypes];
    this.selectedOrganizations = [...this.selectedOrganizations];
  }
  toggleSelectAll(type: 'services' | 'organizations') {
    const options = type === 'services' ? this.allServiceTypes : this.allOrganizations;
    const selected = type === 'services' ? this.selectedServiceTypes : this.selectedOrganizations;
    const allSelected = options.every(opt => selected.includes(opt));
    if (allSelected) {
      if (type === 'services') this.selectedServiceTypes = [];
      else this.selectedOrganizations = [];
    } else {
      if (type === 'services') this.selectedServiceTypes = [...options];
      else this.selectedOrganizations = [...options];
    }
  }
  areAllSelected(type: 'services' | 'organizations'): boolean {
    const selected = type === 'services' ? this.selectedServiceTypes : this.selectedOrganizations;
    const options = type === 'services' ? this.allServiceTypes : this.allOrganizations;
    return options.length > 0 && options.every(opt => selected.includes(opt));
  }
  getSelectedLabel(selected: string[], label: string): string {
    if (!selected || selected.length === 0) return label;
    if (selected.length === 1) return selected[0];
    return `${selected[0]} +${selected.length - 1} more`;
  }
  updateLength(len: number) {
    this.nofhelpers = len;
  }
  handleselect(helper: any) {
    this.selectedhelper = helper;
  }
  onclick() {
    this.helperservice.setSelectedHelper(null);
    this.router.navigate(['/add-edit-helper']);
    console.log("Add button clicked");
  }
  onsearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
  }
  displaysortpopup = false;
  selectedSort: 'employeeid' | 'fullName' | null = null;
  selectSort(type: 'employeeid' | 'fullName') {
    this.selectedSort = type;
  }
  selectedFilters: string[] = [];
  allDepartments = ['asbl']
  applyFilters() {
    this.helperservice.filterByMultipleCriteria(this.selectedServiceTypes, this.selectedOrganizations);
    this.showfilter = this.selectedServiceTypes.length > 0 || this.selectedOrganizations.length > 0;
  }
  resetFilters() {
    this.selectedServiceTypes = [];
    this.selectedOrganizations = [];
    this.helperservice.resetFilters();
    this.showfilter = false;
  }
  
}