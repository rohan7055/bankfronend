import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder,FormControl,Validators} from '@angular/forms';
import {Router, NavigationExtras} from "@angular/router";

import {Customer} from '../_models/index';
import{CustomerserviceService,AlertService,DataService,StateCitydataService} from '../_services/index';
import { ConfirmComponent } from '../_directives/index';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-updatecustomer',
  templateUrl: './updatecustomer.component.html',
  styleUrls: ['./updatecustomer.component.css']
})
export class UpdatecustomerComponent implements OnInit {

   cust_name="Rohan";
   show:boolean=false;
   loading:boolean=false;
   found:boolean=false;
   reset:boolean=false;
   check:boolean=true;
   disable:boolean=false;

    updateCustomerForm : FormGroup;
    constructor(private formBuilder: FormBuilder,
        private customerService : CustomerserviceService,
        private alertService:AlertService,
        private dialogService:DialogService ,
        private dataService:DataService,
        private router: Router) {
        this.buildForm();
    }

    ngOnInit() {
    }

    buildForm()
    {
        this.updateCustomerForm = this.formBuilder.group({
            ssn: ['',Validators.compose([Validators.required,Validators.minLength(9),Validators.maxLength(9),Validators.pattern('^[0-9]{9}$')])],

            cust_name: ['',Validators.compose([Validators.required,Validators.pattern('^[0-9]{9}$')])],
            old_cust_name: ['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z]$')])],
            new_cust_name: ['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z]$')])],
            old_cust_addr: ['',Validators.compose([Validators.required])],
            new_cust_addr: ['',Validators.compose([Validators.required])],
            old_cust_age: ['',Validators.compose([Validators.required,Validators.pattern('^[0-9]{2}$')])],
            new_cust_age: ['',Validators.compose([Validators.required,Validators.pattern('^[0-9]{2}$')])]
            });
    }

    onSubmit()
    {
        console.log("updated successfully");
    }

    checkCustomer(){
      this.loading=true;
      console.log(this.updateCustomerForm.value['ssn'])
      this.customerService.checkupdatecustomer(this.updateCustomerForm.value['ssn'])
      .subscribe(data=>{
        this.loading=false;
        console.log(data)
        if(data['status']){
          this.show=true;
          this.disable=true;
          this.check=false;
          this.reset=true;
          this.found=true;
          this.updateCustomerForm.controls['ssn'].disable();
          this.alertService.success(data['message']);

        }else{
          this.show=false;
            if(data['statusCode']==3){
              this.showConfirm(data['message'],data['data']['ssn'])
            }else{
              this.alertService.error(data['message']);

            }
        }

      },error=>{
        this.loading=false;

       this.alertService.error("Some Error Occured");
      })
    }


    showConfirm(message:string,ssn:number) {
        console.log(ssn)
        let disposable = this.dialogService.addDialog(ConfirmComponent, {
            title:'Create Customer',
            message:message})
            .subscribe((isConfirmed)=>{
                //We get dialog result
                if(isConfirmed) {
                  this.customerService.reActivateCustomer(ssn)
                  .subscribe(data=>{
                    console.log("Reactivation")
                    console.log(data)
                       if(!data['status']){
                           this.showPrompt(data['message'])
                       }else{
                         this.alertService.success(data['message'])
                         this.dataService.storage=data['data'];
                         this.router.navigate(["viewcustomer"]);


                       }
                  },error=>{
                    this.alertService.error(error['message'])
                  });
                }
                else {
                    alert('declined');
                }
            });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
      /*  setTimeout(()=>{
            disposable.unsubscribe();
        },10000);*/
    }


    showPrompt(message:string) {
            let disposable = this.dialogService.addDialog(ConfirmComponent, {
                title:'Reactivate Customer',
                message:message})
                .subscribe((isConfirmed)=>{
                    //We get dialog result
                    if(isConfirmed) {
                      alert('success');

                    }
                    else {
                        alert('declined');
                    }
                });
            //We can close dialog calling disposable.unsubscribe();
            //If dialog was not closed manually close it by timeout
            setTimeout(()=>{
                disposable.unsubscribe();
            },10000);
        }


        resetForm(){
          this.show=false;
          this.updateCustomerForm.controls['ssn'].enable();
          this.updateCustomerForm.reset();
          this.found=false;
          this.check=true;
          this.reset=false
        }



}
