import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule}    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';



// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent ,DisableControlDirective,ConfirmComponent} from './_directives/index';
import { SharedModule } from './shared/shared.module';

import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService ,CustomerserviceService,DataService} from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UpdatecustomerComponent } from './updatecustomer/updatecustomer.component';
import { DeletecustomerComponent } from './deletecustomer/deletecustomer.component';
import {ViewcustomerComponent} from './viewcustomer/viewcustomer.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        ReactiveFormsModule,
        BootstrapModalModule
    ],

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
        ConfirmComponent,
        ViewcustomerComponent

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
        // provider used to create fake backend
        fakeBackendProvider,
        DataService
    ],
    //Don't forget to add the component to entryComponents section
     entryComponents: [
       ConfirmComponent
     ],
    bootstrap: [AppComponent]
})

export class AppModule { }
