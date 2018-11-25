import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';
import{CustomerserviceService,AlertService,DataService,StateCitydataService} from '../../_services/index';
import {Customer} from '../../_models/index';


export interface CustomerDialog {
  title:string;
  message:string;
}



@Component({
  selector: 'app-customermodalsearch',
  templateUrl: './customermodalsearch.component.html',
  styleUrls: ['./customermodalsearch.component.css']
})
export class CustomermodalsearchComponent extends DialogComponent<CustomerDialog, any> implements CustomerDialog {
  customerSearchForm:FormGroup;
  title: string;
  message: string;
  disable:boolean=true;
  customer:Customer;

  constructor(private formBuilder : FormBuilder,
          private customerService : CustomerserviceService,
          dialogService: DialogService) {
            super(dialogService);
            this.buildForm();
           }



  buildForm()
  {
      this.customerSearchForm = this.formBuilder.group({
          ssn : this.formBuilder.control(null,[Validators.required,Validators.minLength(9),Validators.maxLength(9),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          cust_id : this.formBuilder.control(null,[Validators.required,Validators.minLength(9),Validators.maxLength(9),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
      });

      this.customerSearchForm.get('ssn').valueChanges.subscribe(ssn => {
            if(this.check_if_is_integer(ssn)){
              if(ssn<=0){
                this.disable=true;
                this.customerSearchForm.get('ssn').setValue('');
              }else if(ssn.length==9){
                this.disable=false;

              }else if(ssn.length>9||ssn.length<9){
                this.disable=true;

              }
            }
            else{
              this.disable=true;
              if(ssn=="+"||ssn=="-"||ssn=="@"||ssn=="^"||ssn=="!"||ssn=="%"||ssn=="&"||ssn==" "){
              this.customerSearchForm.get('ssn').setValue('');
            }
          }
      });

      this.customerSearchForm.get('cust_id').valueChanges.subscribe(cust_id => {
            if(this.check_if_is_integer(cust_id)){
              if(cust_id<=0){
                this.disable=true;
                this.customerSearchForm.get('cust_id').setValue('');
              }
              else if(cust_id.length==9){
                this.disable=false;

              }else if(cust_id.length>9||cust_id.length<9){
                this.disable=true;

              }
            }
            else {
              this.disable=true;

              if(cust_id=="+"||cust_id=="-"||cust_id=="@"||cust_id=="^"||cust_id=="!"||cust_id=="%"||cust_id=="&"||cust_id==" "){
              this.customerSearchForm.get('cust_id').setValue('');
            }
          }
      });
  }

  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.customer=new Customer(this.customerSearchForm.value);

    if(this.customer.cust_id>0&&(this.customer.ssn==null||this.customerSearchForm.value['ssn'].trim()=="")){
      //search by acct_id
      this.customerService.getcustomerbycustId(this.customer.cust_id).subscribe(
        data=>{
          console.log(data)
          console.log("search by cust_id")
          if(data['status']){
          this.result = data['data'];
          this.close();
          }
        },error=>{
          console.log(error)

        }
      )


    }else if((this.customer.cust_id==null||this.customerSearchForm.value['cust_id'].trim()=="")&&this.customer.ssn>0)
    {
      this.customerService.getcustomerbySSN(this.customer.ssn).subscribe(
        data=>{
          console.log(data)
          console.log("search by ssn")
          if(data['status']){
          this.result = data['data'];
          this.close();
          }

        },error=>{
          console.log(error)

        }
      )

      //search by cust_id


    }else if(this.customer.cust_id>0&&this.customer.ssn>0){
      //search by both
      console.log("search by both")
      this.result = this.customerSearchForm.value;
      this.close();


    }else{
      console.log("search by both else")
      console.log(this.customer.cust_id)
      console.log(this.customer.ssn)

      this.result = this.customerSearchForm.value;
      this.close();

    }

  }

  check_if_is_integer(value){
 if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
    // I can have spacespacespace1 - which is 1 and validators pases but
    // spacespacespace doesn't - which is what i wanted.
    // 1space2 doesn't pass - good
    // of course, when saving data you do another parseInt.
     return true;
 } else {
     return false;
 }
    }


}
