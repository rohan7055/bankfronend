import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';
import{CustomerserviceService,AlertService} from '../_services/index';

@Component({
  selector: 'app-deletecustomer',
  templateUrl: './deletecustomer.component.html',
  styleUrls: ['./deletecustomer.component.css']
})
export class DeletecustomerComponent implements OnInit {

     loadingCustID=false;
     loading=false;

    ngOnInit()
    {

    }

    deleteCustomerForm : FormGroup;

    constructor(private formBuilder : FormBuilder,
            private customerservice:CustomerserviceService,
          private alertService:AlertService)
    {
        this.buildForm();
    }

    buildForm()
    {
        this.deleteCustomerForm = this.formBuilder.group({
            ssn : this.formBuilder.control(null,[Validators.maxLength(9),Validators.pattern(/^[0-9]{9}$/)]),
            cust_id : this.formBuilder.control(null,[Validators.maxLength(9),Validators.pattern(/^[0-9]{9}$/)])
        });
    }


    onSubmit()
    {
        let custid=this.deleteCustomerForm.value['cust_id'];
        let ssn = this.deleteCustomerForm.value['ssn'];
        console.log(custid);
        this.loading=true;

        this.customerservice.delete(custid)
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
                  this.loadingCustID=false;

                    this.alertService.error(error['message'])

                })

    }
    onReset()
    {
        this.deleteCustomerForm.reset();
    }
    onBlurMethod(){
      this.loadingCustID=true;
      let custid=this.deleteCustomerForm.value['cust_id'];

      this.customerservice.checkdeleteByCustId(custid)
      .subscribe(data=>{
        this.loadingCustID=false;

          if(data['status']){
           this.alertService.success(data["message"])
          }else{
            this.alertService.error(data['message'])
          }
      },

              error=>{
                this.loadingCustID=false;

                  this.alertService.error(error['message'])
     })

    }


}
