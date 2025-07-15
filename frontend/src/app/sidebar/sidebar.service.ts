import { Injectable } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class sidebarService {
    private url='http://localhost:3000/api/allHelpers';
    constructor (private http:HttpClient) {}
    getData(): Observable<any>{
        return this.http.get<any>(this.url);
    }
}