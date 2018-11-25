import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
      selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    loginForm : FormGroup;

    constructor(
      private formBuilder : FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService)
        {
              this.buildForm();
         }

     buildForm()
     {
           this.loginForm = this.formBuilder.group({
               username : this.formBuilder.control('',[Validators.required,Validators.minLength(9),Validators.pattern(/^[0-9]{9}$/)]),
               password : this.formBuilder.control('',[Validators.required,Validators.minLength(8)])
            });
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {

      let username=this.loginForm.value['username'];
      let password = this.loginForm.value['password'];
        this.loading = true;
        this.authenticationService.login(username,password)
            .subscribe(

                data => {
                  console.log(data)

                    if(data['status']){
                      this.router.navigate([this.returnUrl]);
                      this.alertService.success(data['message']);
                    this.loading = false;
                  }else{
                    this.alertService.error(data['message']);
                  this.loading = false;
                  }
                },error=>{
                    this.alertService.error(error['error']);
                    this.loading = false;
                })
    }

    onReset()
    {
        this.loginForm.reset();
    }
}
