import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HelperDataComponent } from '../../components/helper-data/helper-data.component';
import { SidebarComponent } from '../../components/aside-components/sidebar/sidebar.component';
import { HelperCardComponent } from '../../components/helper-components/helper-card/helper-card.component';
import { HelperServiceService } from '../../shared/helper-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../../components/dialog_components/filter-dialog/filter-dialog.component';
import { SortDialogComponent } from '../../components/dialog_components/sortdialog/sortdialog.component';
import { SearchhelperPipe } from '../../shared/searchhelper.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-portal',
  
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css'
})
export class PortalComponent implements OnInit {
  allhelper = this.helperservice.helper;
  selectedhelper: any = null;
  nofhelpers = this.helperservice.noofhelpers;
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
  { label: 'Helper Name', value: 'fullName' }
];


  ngOnInit(): void {
    this.helperservice.getData();
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
    if (type === 'employeeid') {
      this.allhelper().sort((a, b) => a.employeeid - b.employeeid);
    } else if (type === 'fullName') {
      this.allhelper().sort((a, b) => a.fullName.localeCompare(b.fullName));
    }
  }
  selectedFilters: string[] = [];
  allDepartments = ['asbl']

  openFilterDialog(event?: MouseEvent) {
    const triggerElement = event?.target as HTMLElement;
    const rect = triggerElement?.getBoundingClientRect();

    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '300px',
      data: {
        serviceTypes: this.helperservice.getAllServiceTypes(),
        organizations: this.helperservice.getAllOrganizations(),
        serviceLimit: 3,
        organizationLimit: 3,
        initialServices: this.selectedServiceTypes,
        initialOrganizations: this.selectedOrganizations
      },
      position: {
        top: `140px`,
        left: `80px`
      },
      hasBackdrop: true,
      panelClass: 'custom-filter-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.reset) {
        this.selectedServiceTypes = [];
        this.selectedOrganizations = [];
        this.showfilter = false;
        this.helperservice.resetFilters();
        return;
      }

      if (result) {
        const { services, organizations } = result;
        this.selectedServiceTypes = services;
        this.selectedOrganizations = organizations;
        this.showfilter = true;
        this.helperservice.filterByMultipleCriteria(services, organizations);
      }
    });
  }

  openSortDialog(event: MouseEvent) {
  const dialogRef = this.dialog.open(SortDialogComponent, {
    data: { currentSort: this.selectedSort },
    position: {
      top: '140px',
      left: '28px'
    },
    panelClass: 'custom-filter-dialog',
    hasBackdrop: true,
  });

  dialogRef.afterClosed().subscribe((result: 'employeeid' | 'fullName' | null) => {
    console.log(result);
    if (result) {
      this.selectSort(result);
    }
  });
}

  
}