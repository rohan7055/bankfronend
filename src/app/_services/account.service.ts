import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Account } from "app/_models";

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  httpOptions:any = {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'

          })
        };

  //1.Create Account
  createAccount(account: Account)
  {
      return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/account/createaccount",JSON.stringify(account),this.httpOptions)
  }

  //2.Delete Account
  checkdeleteByAccountId(AccountId:number){
    return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/account/checkdelete",{acct_id:AccountId},this.httpOptions)

  }
  deleteAccount(AccountId:number, AccountType:string){
      return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/account/deleteaccount",{acct_id:AccountId, acct_type:AccountType},this.httpOptions)

  }

  viewAccount(acctId: number)
  {
      return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/account/viewbyacctid",{acct_id:acctId},this.httpOptions)
  }

  viewAllAccounts(){

    return this.http.post<any>("http://localhost:5000/RetailBanking_GroupB/account/viewallaccounts",{},this.httpOptions)

  }


}
