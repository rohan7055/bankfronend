import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';
import{CustomerserviceService,AlertService,DataService,StateCitydataService} from '../../_services/index';

export interface AccountDialog {
  title:string;
  message:string;
}

@Component({
  selector: 'app-accountmodalsearch',
  templateUrl: './accountmodalsearch.component.html',
  styleUrls: ['./accountmodalsearch.component.css']
})
export class AccountmodalsearchComponent extends DialogComponent<AccountDialog, any> implements AccountDialog {

  accountSearchForm:FormGroup;
  title: string;
  message: string;

  constructor(private formBuilder : FormBuilder,
          private customerService : CustomerserviceService,
          dialogService: DialogService) {
            super(dialogService);
            this.buildForm();
           }



  buildForm()
  {
      this.accountSearchForm = this.formBuilder.group({
          acct_id : this.formBuilder.control(0,[Validators.required,Validators.minLength(9),Validators.maxLength(9),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          cust_id : this.formBuilder.control(0,[Validators.required,Validators.minLength(9),Validators.maxLength(9),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
      });

    
  }

  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = this.accountSearchForm.value;
    this.close();
  }

}
