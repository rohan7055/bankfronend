import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-updatecustomer',
  templateUrl: './updatecustomer.component.html',
  styleUrls: ['./updatecustomer.component.css']
})
export class UpdatecustomerComponent implements OnInit {

    updateCustomerForm : FormGroup;
    constructor(private formBuilder: FormBuilder) { 
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
    
    
}
