import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {
  allhelper: any[] = [];
  private url = "http://localhost:3000/api";
  private selectedHelper = signal<any>(null);

  constructor(private http: HttpClient) {}

  private users = signal<any[]>([]);

  private filteredUsers = signal<any[]>([]);
  private searchedUsers = signal<any[]>([]);

  private currentSearchTerm = signal<string>('');

  private totalUsers = signal<number>(0);
  readonly totalnoofuser = computed(() => this.totalUsers());
  
  private searchTimeout: any = null;
  readonly helper = computed(() => {
    const term = this.currentSearchTerm().trim();
    return term ? this.searchedUsers() : this.filteredUsers();
  });

  readonly noofhelpers = computed(() => this.helper().length);

  private form1Data = signal<any>(null);
  private form2Data = signal<any>(null);

  private lasthelper = signal<any>(null);
  readonly getlasthelper = computed(() => this.lasthelper());

  private showmsg = signal<boolean>(false);
  readonly showsucess = computed(() => this.showmsg());

  getData() {
    this.http.get<any[]>(`${this.url}/allhelpers`).subscribe(helper => {
      this.users.set(helper);
      this.filteredUsers.set(helper);
      if (!this.totalUsers()) {
        this.totalUsers.set(helper.length);
      }
    });
  }

  deletehelper(id: number) {
    return this.http.delete(`${this.url}/delete?id=${id}`).subscribe(() => {
      const updatedFiltered = this.filteredUsers().filter(helper => helper.employeeid !== id);
      this.filteredUsers.set(updatedFiltered);
      const updatedSearched = this.searchedUsers().filter(helper => helper.employeeid !== id);
      this.searchedUsers.set(updatedSearched);
    });
  }

  searchhelper(searchterm: string) {
    this.currentSearchTerm.set(searchterm);

    if (this.searchTimeout) clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      const trimmed = searchterm.trim();

      if (!trimmed) {
        this.searchedUsers.set([]);
        return;
      }

      this.http.get<any[]>(`${this.url}/search?query=${trimmed}`).subscribe(helper => {
        this.searchedUsers.set(helper);
      });
    }, 300); 
  }

  setForm1Data(data: any) {
    this.form1Data.set(data);
  }

  setForm2Data(data: any) {
    this.form2Data.set(data);
  }

  getForm1Data(): any {
    return this.form1Data();
  }

  getForm2Data(): any {
    return this.form2Data();
  }
  postResult = signal<any | null>(null);
 postData(formdata: any) {
    this.http.post(`${this.url}/allHelpers`, formdata).subscribe(res => {
      this.lasthelper.set(res);
      this.postResult.set(res); // ✅ Emit for consumer
      this.showmsg.set(true);
      console.log(res);
      setTimeout(() => this.showmsg.set(false), 2000);
    });
  }

  updateHelper(id: number, formdata: any) {
    this.http.patch(`${this.url}/editHelper?id=${id}`, formdata).subscribe(res => {
      this.lasthelper.set(res);
      this.showmsg.set(true);
      console.log(res);
      setTimeout(() => this.showmsg.set(false), 2000);
    });
  }

  setSelectedHelper(helper: any) {
    this.selectedHelper.set(helper);
  }

  getSelectedHelper(): any {
    return this.selectedHelper();
  }

  getAllServiceTypes(): string[] {
    return [...new Set(this.helper().map(h => h.typeOfService))];
  }

  getAllOrganizations(): string[] {
    return [...new Set(this.helper().map(h => h.organizationName))];
  }

  filterByMultipleCriteria(services: string[], organizations: string[]) {
    const filtered = this.users().filter(helper => {
      const serviceMatch = services.length === 0 || services.includes(helper.typeOfService);
      const orgMatch = organizations.length === 0 || organizations.includes(helper.organizationName);
      return serviceMatch && orgMatch;
    });

    this.filteredUsers.set(filtered);
  }

  resetFilters() {
    this.filteredUsers.set(this.users());
  }
}
