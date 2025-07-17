import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {
  allhelper:any[] = [];
  private url="http://localhost:3000/api"
  constructor(private http:HttpClient) { }
  
  getData():Observable<any[]>
  {
    return this.http.get<any[]>(`${this.url}/allhelpers`);
  }
  deletehelper(id:number){
    return this.http.delete(`${this.url}/delete?id=${id}`);
  }
  
  
}
