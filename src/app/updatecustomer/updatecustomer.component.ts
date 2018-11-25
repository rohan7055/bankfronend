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
   loadingSSN:boolean=false;
   found:boolean=false;
   reset:boolean=false;
   check:boolean=true;
   disable:boolean=false;
   customer:Customer;
   ssnreadonly:boolean=false;
   notNum:boolean=false;

    updateCustomerForm : FormGroup;
    constructor(private formBuilder: FormBuilder,
        private customerService : CustomerserviceService,
        private alertService:AlertService,
        private dialogService:DialogService ,
        private dataService:DataService,
        private router: Router) {
        this.buildForm();
    }

    ngOnInit(){
    this.updateCustomerForm.get('ssn').valueChanges.subscribe(ssn => {
          if(this.check_if_is_integer(ssn)){
            if(ssn<=0){
              this.updateCustomerForm.get('ssn').setValue('');
            }
          }
          else if(ssn=="+"||ssn=="-"||ssn=="@"||ssn=="^"||ssn=="!"||ssn=="%"||ssn=="&"||ssn==" "){
            this.updateCustomerForm.get('ssn').setValue('');
          }
    });
  }

    buildForm()
    {
        this.updateCustomerForm = this.formBuilder.group({
            ssn: ['',Validators.compose([Validators.required,Validators.minLength(9),Validators.maxLength(9),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],

            cust_name: ['',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z\s]+$/)])],
            new_cust_name: ['',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z\s]+$/),
          Validators.minLength(5),Validators.maxLength(50)])],
            cust_addr: ['',Validators.compose([Validators.required])],
            new_cust_addr: ['',Validators.compose([Validators.required])],
            cust_age: ['',Validators.compose([Validators.required,Validators.pattern('^[0-9]{2}$')])],
            new_cust_age: ['',Validators.compose([Validators.required,Validators.min(18),Validators.max(99),Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)])]
            });
    }

    onSubmit()
    {
        console.log("updated successfully");
    }

    checkCustomer(){
      this.loadingSSN=true;
      console.log(this.updateCustomerForm.value['ssn'])
      if(this.check_if_is_integer(this.updateCustomerForm.value['ssn'])){
      this.customerService.checkupdatecustomer(this.updateCustomerForm.value['ssn'])
      .subscribe(data=>{
        this.loadingSSN=false;
        console.log(data)

        if(data['status']){
          this.customer=new Customer(data['data'])
          console.log(this.customer.cust_id)
          this.show=true;
          this.disable=true;
          this.check=false;
          this.reset=true;
          this.found=true;
          this.setData(this.customer)
         //  this.updateCustomerForm.controls['ssn'].disable();
         this.ssnreadonly=true;

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
        this.loadingSSN=false;

       this.alertService.error("Some Error Occured");
      })
    }else{
      this.notNum=true;
    }

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

        setData(customer:Customer){
          this.updateCustomerForm.get('cust_name').setValue(customer.cust_name)
          this.updateCustomerForm.get('cust_addr').setValue(customer.cust_addr)
          this.updateCustomerForm.get('cust_age').setValue(customer.cust_age)


        }


        resetForm(){
          this.show=false;
          this.updateCustomerForm.controls['ssn'].enable();
          this.updateCustomerForm.reset();
          this.found=false;
          this.check=true;
          this.reset=false
        }


        updateCustomer(){
          this.loading=true;
          if(this.check_if_is_integer(this.updateCustomerForm.value['new_cust_age'])
            &&this.updateCustomerForm.value['new_cust_addr'].trim()!=""
             &&this.updateCustomerForm.value['new_cust_name'].trim()!=""){
          this.customerService.updatecustomer(
            this.customer.ssn,
            this.updateCustomerForm.value['new_cust_name'],
            this.updateCustomerForm.value['new_cust_addr'],
            this.updateCustomerForm.value['new_cust_age']
          ).subscribe(data=>{
            console.log(data)
            this.loading=false;
            if(data['status']){
                this.resetForm();
                this.alertService.success(data['message'])
            }else{
              this.alertService.error(data['message'])

            }
          },
            error=>{
              this.loading=false;
              console.log(error)
              this.alertService.error(error['message'])

            })
        }else{
          alert("Enter All Fields")
          this.loading=false;
          this.loadingSSN=false;

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
