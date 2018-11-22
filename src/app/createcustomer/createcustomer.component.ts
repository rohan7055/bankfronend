import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder,FormControl} from '@angular/forms';
import {Customer} from '../_models/index';
import{CustomerserviceService,AlertService} from '../_services/index';
import {DisableControlDirective} from '../_directives/disablecontrol.directive';




@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css']
})
export class CreatecustomerComponent implements OnInit {

    createCustomerForm : FormGroup;
    customer : Customer;
    loadingName = false;
    loading=false;
    disable=false;



    constructor(private formBuilder : FormBuilder,
            private customerService : CustomerserviceService,
          private alertService:AlertService ) {

        this.buildForm();
    }

    ngOnInit() {
    this.createCustomerForm.get('ssn').valueChanges.subscribe(value => {
      // do something with value here
      console.log(value);
    });

  }

  onSearchType(value: string) {
    console.log(value);
  //  this.searchUpdated.next(value); // Emit the event to all listeners that signed up - we will sign up in our contractor

}


    buildForm()
    {
        this.createCustomerForm = this.formBuilder.group({
            ssn : this.formBuilder.control(null),
            cust_name : this.formBuilder.control(null),
            cust_age : this.formBuilder.control(null),
            cust_addr : this.formBuilder.control(null),
            cust_state : this.formBuilder.control(null),
            cust_city : this.formBuilder.control(null)

        });
    }

    onSubmit()
    {

        console.log(this.createCustomerForm.value);
        this.customer = new Customer(this.createCustomerForm.value);
        console.log(this.customer.cust_id);
        this.customerService.registerCustomer(this.customer)
        .subscribe(data=>{
            console.log(data);
            if(data['status']){
              this.onReset();
              //customer successfully registered
              this.alertService.success(data['message'])
            }else{
              this.alertService.error(data['message'])
            }

        },error=>{
            this.alertService.error("Server Error Occured,Server down");
        });
    }

    onReset()
    {
        this.createCustomerForm.reset();
    }

    onBlurMethod(){
      this.disableForm(true);
      this.loadingName=true;
      this.disable=true;
      console.log(this.createCustomerForm.value['ssn'])
      this.customerService.checkCustomer(this.createCustomerForm.value['ssn'])
      .subscribe(data=>{
        this.loadingName=false;
        console.log(data)
        if(data['status']){
          this.disableForm(false);
          this.disable=false;
          this.alertService.success(data['message']);

        }else{
            this.alertService.error(data['message']);
        }

      },error=>{
       this.alertService.error("Some Error Occured");
      })

    }

    disableForm(disable:boolean){

      Object.keys(this.createCustomerForm.controls).forEach(key => {
        if(key!='ssn'){
          if(disable){
       this.createCustomerForm.get(key).disable();
     }else{
       this.createCustomerForm.get(key).enable();
     }
        }
         });
    }




}
