import { Injectable , signal, Signal} from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { computed } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {
  allhelper:any[] = [];
  private url="http://localhost:3000/api"
  constructor(private http:HttpClient) { }


  private users=signal<any[]>([]);
  readonly helper=computed(()=> this.users());
  readonly noofhelpers = computed(() => this.users().length);

  private form1Data = signal<any>(null);
  private form2Data = signal<any>(null);

  private searchusers=signal<any[]>([]);
  readonly searchhelpers=computed(()=>this.searchusers());
  readonly searchlength=computed(()=>this.searchusers().length);

  private lasthelper=signal<any>(null);
  readonly getlasthelper=computed(()=>this.lasthelper());
  private showmsg=signal<boolean>(false);
  readonly showsucess=computed(()=>this.showmsg())
  getData()
  {
    this.http.get<any[]>(`${this.url}/allhelpers`).subscribe(helper=>{
      this.users.set(helper);
    });

  }
  deletehelper(id:number){
    return this.http.delete(`${this.url}/delete?id=${id}`).subscribe(()=>{
      const updatedhelper=this.users().filter(helper => helper.employeeid!==id);
      this.users.set(updatedhelper)
    });
  }
  searchhelper(searchterm:string){
    this.http.get<any[]>(`${this.url}/search?query=${searchterm}`).subscribe(helper=>{
      this.searchusers.set(helper)
    })
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

  postData(formdata:any){
      this.http.post(`${this.url}/allHelpers`, formdata).subscribe(res => {
        this.lasthelper.set(res);
        this.showmsg.set(true);
        console.log(res);
        setTimeout(() => {
          this.showmsg.set(false);
        }, 2000);
      });
  }
}