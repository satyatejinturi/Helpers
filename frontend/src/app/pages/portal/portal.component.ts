import { Component, OnInit,ViewChild,HostListener,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HelperDataComponent } from '../../components/helper-data/helper-data.component';
import { SidebarComponent } from '../../components/aside-components/sidebar/sidebar.component';
import { HelperCardComponent } from '../../components/helper-components/helper-card/helper-card.component';
import { HelperServiceService } from '../../shared/helper-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../../components/dialog_components/filter-dialog/filter-dialog.component';
@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [SidebarComponent, HelperCardComponent, HelperDataComponent, CommonModule, FormsModule,
    MatDialogModule,FilterDialogComponent
  ],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css'
})
export class PortalComponent implements OnInit {
  allhelper = this.helperservice.helper;
  selectedhelper: any = null;
  nofhelpers = this.helperservice.noofhelpers;
  constructor(public helperservice: HelperServiceService,
     public router: Router,
    public dialog: MatDialog,) {}

  selectedServiceTypes: string[] = [];
  selectedOrganizations: string[] = [];


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

  sortpopup() {
    this.displaysortpopup = !this.displaysortpopup;
  }

  onsearch(event: Event): void {
    const searchterm = event.target as HTMLInputElement;
    this.helperservice.searchhelper(searchterm.value);
  }
  displaysortpopup = false;

  @ViewChild('sortPopup') sortPopupRef!: ElementRef;

  toggleSortPopup(event: MouseEvent) {
    event.stopPropagation(); 
    this.displaysortpopup = !this.displaysortpopup;
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement) {
    if (this.displaysortpopup && this.sortPopupRef) {
      const clickedInside = this.sortPopupRef.nativeElement.contains(target);
      if (!clickedInside) {
        this.displaysortpopup = false;
      }
    }
  }

  selectedSort: 'id' | 'name' | null = null;

  selectSort(type: 'id' | 'name') {
    this.selectedSort = type;
    if (type === 'id') {
      this.allhelper().sort((a, b) => a.employeeid - b.employeeid);
    } else if (type === 'name') {
      this.allhelper().sort((a, b) => a.fullName.localeCompare(b.fullName));
    }
  }
  selectedFilters: string[] = [];
  allDepartments = ['asbl']

  openFilterDialog(event?: MouseEvent) {
  const triggerElement = event?.target as HTMLElement;
  const rect = triggerElement?.getBoundingClientRect();

  const dialogRef = this.dialog.open(FilterDialogComponent, {
    width: '400px',
    data: {
  serviceTypes: this.helperservice.getAllServiceTypes(),
  organizations: this.helperservice.getAllOrganizations(),
  serviceLimit: 3,
  organizationLimit: 3,
  initialServices: this.selectedServiceTypes,
  initialOrganizations: this.selectedOrganizations
},
    position: {
      top: `${rect?.bottom + 5}px`,
      left: `${rect?.left}px`
    },
    hasBackdrop: true,
    panelClass: 'custom-filter-dialog'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result?.reset) {
      this.selectedServiceTypes = [];
      this.selectedOrganizations = [];
      this.helperservice.resetFilters();
      return;
    }

    if (result) {
      const { services, organizations } = result;
      this.selectedServiceTypes = services;
      this.selectedOrganizations = organizations;
      this.helperservice.filterByMultipleCriteria(services, organizations);
    }
  });
}


}