import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder,FormControl} from '@angular/forms';
import { Account } from "app/_models";
import { AccountService, AlertService } from '../_services/index';


@Component({
  selector: 'app-viewaccount',
  templateUrl: './viewaccount.component.html',
  styleUrls: ['./viewaccount.component.css']
})
export class ViewaccountComponent implements OnInit {
    
    searchAccountForm : FormGroup;
    account : Account;
    loadingName = false;
    loading=false;
    disable=false;


    constructor(private formBuilder : FormBuilder,
            private accountService : AccountService,
          private alertService:AlertService ) {

        this.buildForm();
    }
  ngOnInit() {
      this.searchAccountForm.get('accountId').valueChanges.subscribe(value => {
          // do something with value here
          console.log(value);
        });
  }
  
  buildForm()
  {
      this.searchAccountForm = this.formBuilder.group({
          acct_Id : this.formBuilder.control(null),
          });
  }
  
  onSubmit()
  {

      console.log(this.searchAccountForm.value);
      this.account = new Account(this.searchAccountForm.value);
      console.log(this.account.acct_id);
      this.accountService.viewAccount(this.account.acct_id)
      .subscribe(data=>{
          console.log(data);
      },error=>{
          this.alertService.error("Server Error Occured!");
      });
  }


}
