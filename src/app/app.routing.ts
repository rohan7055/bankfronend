import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {CreatecustomerComponent} from './createcustomer/index';
import {UpdatecustomerComponent} from './updatecustomer/index';
import {DeletecustomerComponent} from './deletecustomer/index';
import {ViewcustomerComponent} from './viewcustomer/viewcustomer.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path:'createcustomer',component:CreatecustomerComponent, canActivate: [AuthGuard]},
    {path:'updatecustomer',component:UpdatecustomerComponent, canActivate: [AuthGuard]},
    {path: 'deletecustomer',component:DeletecustomerComponent, canActivate: [AuthGuard]},
    {path: 'viewcustomer',component:ViewcustomerComponent, canActivate: [AuthGuard]},



    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
