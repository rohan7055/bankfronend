import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';
import { Account } from '../_models/index';
import{AccountService,AlertService} from '../_services/index';

@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.component.html',
  styleUrls: ['./deleteaccount.component.css']
})
export class DeleteaccountComponent implements OnInit {

     loadingAccountId=false;
     loading=false;

    ngOnInit()
    {

    }

    deleteAccountForm : FormGroup;

    constructor(private formBuilder : FormBuilder,
            private alertService : AlertService,
            private AccountService : AccountService)
    {
        this.buildForm();
    }

    buildForm()
    {
        this.deleteAccountForm = this.formBuilder.group({
            AccountId : this.formBuilder.control(null,[Validators.maxLength(9)]),
            AccountType : this.formBuilder.control('Savings Account')
        });
    }


    onSubmit()
    {
        let  AccountId=this.deleteAccountForm.value['AccountId'];
        let AccountType = this.deleteAccountForm.value['AccountType'];
        console.log( AccountId);
        this.loading=true;


        this.AccountService.deleteAccount(AccountId,AccountType )
        .subscribe(data=>{
          this.loading=false;
            console.log(data)
            if(data['status']){
             this.alertService.success(data["message"])
            }else{
              this.alertService.error(data['message'])
            }
        },

                error=>{
                  this.loadingAccountId=false;

                    this.alertService.error(error['message'])

                })

    }

    onBlurMethod(){
      this.loadingAccountId=true;
      let AccountId=this.deleteAccountForm.value['AccountId'];

      this.AccountService.checkdeleteByAccountId(AccountId)
      .subscribe(data=>{
        this.loadingAccountId=false;

          if(data['status']){
           this.alertService.success(data["message"])
          }else{
            this.alertService.error(data['message'])
          }
      },

              error=>{
                this.loadingAccountId=false;

                  this.alertService.error(error['message'])
     })

    }


}
