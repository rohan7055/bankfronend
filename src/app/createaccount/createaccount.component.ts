import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder,FormControl} from '@angular/forms';
import { Account } from '../_models/index';
import{AccountService, AlertService} from '../_services/index';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
    
    createAccountForm: FormGroup;
    account : Account;

  constructor(private formBuilder: FormBuilder,
          private accountService : AccountService,
          private alertService : AlertService) {
      
      this.buildForm();
  }

  ngOnInit() {
  }
  
  buildForm()
  {
      this.createAccountForm = this.formBuilder.group({
          
          cust_id: this.formBuilder.control(null),
          acct_type: this.formBuilder.control(null),
          acct_balance: this.formBuilder.control(null)
          });
  }
  
  onSubmit()
  {
      console.log(this.createAccountForm.value);
      this.account = new Account(this.createAccountForm.value);
      this.accountService.createAccount(this.account)
      .subscribe(
              data=>{
                  console.log(data)
                  if(data['status'])
                      {
                        this.alertService.success(data['message'])
                      }
                  else{
                      this.alertService.error(data['message'])
                  }
              },
              error=>{
                  console.log(error)
                  this.alertService.error("Server Error Occured,Server down");
              });
              
  }
}
