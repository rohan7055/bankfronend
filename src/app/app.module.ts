﻿import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule}    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';



// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent ,ConfirmComponent,CustomermodalsearchComponent,AccountmodalsearchComponent} from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService ,CustomerserviceService, AccountService,DataService,StateCitydataService} from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UpdatecustomerComponent } from './updatecustomer/updatecustomer.component';
import { DeletecustomerComponent } from './deletecustomer/deletecustomer.component';
import { DeleteaccountComponent } from './deleteaccount/deleteaccount.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import {ViewcustomerComponent} from './viewcustomer/viewcustomer.component';
import {ViewaccountComponent} from './viewaccount/viewaccount.component';
import {ViewallcustomersComponent}from './viewallcustomers/viewallcustomers.component';
import{ViewallaccountsComponent} from './viewallaccounts/index';
import {DataTableModule} from "angular2-datatable";



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        ReactiveFormsModule,
        BootstrapModalModule  ,
      DataTableModule  ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        CreatecustomerComponent,
        HeaderComponent,
        FooterComponent,
        UpdatecustomerComponent,
        DeletecustomerComponent,
        DeleteaccountComponent,
        CreateaccountComponent,
        ConfirmComponent,
        ViewcustomerComponent,
        ViewaccountComponent,
        ViewallcustomersComponent,
        ViewallaccountsComponent,
        CustomermodalsearchComponent,
        AccountmodalsearchComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        CustomerserviceService,
        AccountService,
        DataService,
        StateCitydataService,

        // provider used to create fake backend
        fakeBackendProvider
    ],
  //Don't forget to add the component to entryComponents section
    entryComponents: [
      ConfirmComponent,
      CustomermodalsearchComponent,
      AccountmodalsearchComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
