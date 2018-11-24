import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Customer } from "app/_models";

@Injectable()
export class StateCitydataService {

  constructor(private http: HttpClient) { }

   getJSON() {
      return this.http.get("/assets/state-city.json");
                     
                                    
 }
}
