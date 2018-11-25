import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder,FormControl, Validators} from '@angular/forms';
import {Router, NavigationExtras} from "@angular/router";

import {Customer} from '../_models/index';
import{CustomerserviceService,AlertService,DataService,StateCitydataService} from '../_services/index';
import { ConfirmComponent } from '../_directives/index';
import { DialogService } from "ng2-bootstrap-modal";




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
    states:string[]=[];
    citystatedata={};
    cities:string[]=[];



    constructor(private formBuilder : FormBuilder,
            private customerService : CustomerserviceService,
          private alertService:AlertService,
          private dialogService:DialogService ,
          private dataService:DataService,
           private router: Router,
          private stateCityData : StateCitydataService) {


        this.buildForm();

    }

    ngOnInit() {

        this.stateCityData.getJSON()
        .subscribe(data=>{
            //console.log(data)
            this.citystatedata=data;
            for (let key in data) {
            this.states.push(key)
           //console.log(key);
          }
        },error=>{
            console.log(error)
        });

    this.createCustomerForm.get('cust_state').valueChanges.subscribe(selectedstate => {
           for (let key in  this.citystatedata) {
               if(key==selectedstate){
               this.cities=this.citystatedata[key]
               }

              //console.log(key);
             }
    });



    this.createCustomerForm.get('ssn').valueChanges.subscribe(ssn => {
          if(this.check_if_is_integer(ssn)){
            if(ssn<=0){
              this.createCustomerForm.get('ssn').setValue('');
            }
          }
          else if(ssn=="+"||ssn=="-"||ssn=="@"||ssn=="^"||ssn=="!"||ssn=="%"||ssn=="&"||ssn==" "){
            this.createCustomerForm.get('ssn').setValue('');
          }
    });


  }

  onSearchType(value: string) {
    console.log(value);
  //  this.searchUpdated.next(value); // Emit the event to all listeners that signed up - we will sign up in our contractor

}


    buildForm()
    {
        this.createCustomerForm = this.formBuilder.group({
            ssn : this.formBuilder.control('',[Validators.required,Validators.minLength(9),Validators.maxLength(9),
            Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
            cust_name :this.formBuilder.control('',[Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z\s]+$/),
          Validators.minLength(5),Validators.maxLength(50)]),
            cust_age : this.formBuilder.control('',[Validators.required,Validators.min(18),Validators.max(99)]),
            cust_addr : this.formBuilder.control('',[Validators.required]),
            cust_state :this.formBuilder.control('',[Validators.required]),
            cust_city : this.formBuilder.control('',[Validators.required])

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


    onBlurMethod(){
      let ssnid=this.createCustomerForm.value['ssn']
      console.log("is num",this.check_if_is_integer(ssnid))
      if(ssnid.length<9||ssnid.length>9||!this.check_if_is_integer(ssnid)){
        this.disableForm(true);
        console.log(1)

      }else if(ssnid.length==9&&!this.check_if_is_integer(ssnid)){
        this.disableForm(true);
        console.log(2)

      }
      else if(ssnid.length==9&&this.check_if_is_integer(ssnid)){
        console.log(3)

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
              if(data['statusCode']==3){
                this.showConfirm(data['message'],data['data']['ssn'])
              }else{
                this.alertService.error(data['message']);

              }
          }

        },error=>{
         this.alertService.error("Some Error Occured");
        })
      }
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




}
