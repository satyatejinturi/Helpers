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
    return this.http.get(`${this.url}/search?query=${searchterm}`)
  }
}