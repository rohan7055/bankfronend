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
  checkupdatecustomer(ssnid:number){
    return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/customer/checkupdatecustomer",{ssn:ssnid},this.httpOptions)

  }

  updatecustomer(ssn:number,cust_name:string,cust_addr:string,cust_age:number){
    return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/customer/updatecustomer",{
      ssn:ssn,
      cust_name:cust_name,
      cust_addr:cust_addr,
      cust_age:cust_age
    },this.httpOptions);

  }
  //4.Search Customer
  getcustomerbycustId(cust_id:number){
    return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/customer/getcustomerbycustId",{cust_id:cust_id},this.httpOptions)

  }

  getcustomerbySSN(ssn:number){
    return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/customer/getcustomerbySSN",{ssn:ssn},this.httpOptions)

  }
  //5.View All Customers
  viewallcustomers(){
    return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/customer/viewall",{},this.httpOptions)

  }

  reActivateCustomer(ssn:number){
      return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/customer/reactivatecustomer",{ssn:ssn},this.httpOptions)

    }

}
