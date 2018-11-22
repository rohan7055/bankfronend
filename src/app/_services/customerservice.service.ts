import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Customer } from "app/_models";

@Injectable()
export class CustomerserviceService {

  constructor(private http:HttpClient) {

  }

  httpOptions:any = {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'

          })
        };

  //1.Create Customer
  checkCustomer(customerssn:number){
    return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/customer/checkcustomerssn",{ssn:customerssn},this.httpOptions)
  }
  registerCustomer(customer:Customer){

      return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/customer/createcustomer",JSON.stringify(customer),this.httpOptions)


  }

  //2.Delete Customer
  checkdeleteByCustId(custid:number){
    return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/customer/checkdeletecustomer",{cust_id:custid},this.httpOptions)

  }
  delete(custid:number){
      return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/customer/delete",{cust_id:custid},this.httpOptions)

  }

  //3.Update Customer
  //4.Search Customer
  //5.View All Customers

}
