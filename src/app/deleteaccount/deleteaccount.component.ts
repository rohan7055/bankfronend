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
            acct_id : this.formBuilder.control('')
        });
    }


    onSubmit()
    {
        let acct_id=this.deleteAccountForm.value['acct_id'];
        let acct_type = this.deleteAccountForm.value['acct_type'];
        console.log(acct_id);
        this.loading=true;


        this.AccountService.deleteAccount(acct_id,acct_type )
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

    onReset()
    {
        this.deleteAccountForm.reset();
    }

}
