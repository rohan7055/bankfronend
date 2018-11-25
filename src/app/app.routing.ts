import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {CreatecustomerComponent} from './createcustomer/index';
import {UpdatecustomerComponent} from './updatecustomer/index';
import {DeletecustomerComponent} from './deletecustomer/index';
import {DeleteaccountComponent} from './deleteaccount/index';
import {CreateaccountComponent} from './createaccount/index';
import {ViewcustomerComponent} from './viewcustomer/viewcustomer.component';
import {ViewaccountComponent} from './viewaccount/viewaccount.component';
import {ViewallcustomersComponent} from './viewallcustomers/viewallcustomers.component';
import{ViewallaccountsComponent} from './viewallaccounts/index';




const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path:'createcustomer',component:CreatecustomerComponent, canActivate: [AuthGuard]},
    {path:'updatecustomer',component:UpdatecustomerComponent, canActivate: [AuthGuard]},
    {path: 'deletecustomer',component:DeletecustomerComponent, canActivate: [AuthGuard]},
    {path: 'deleteaccount',component:DeleteaccountComponent, canActivate: [AuthGuard]},
    {path: 'createaccount',component:CreateaccountComponent, canActivate: [AuthGuard]},
    {path: 'viewcustomer/:id',component:ViewcustomerComponent, canActivate: [AuthGuard]},
    {path: 'viewaccount',component:ViewaccountComponent, canActivate: [AuthGuard]},
    {path: 'viewallcustomers',component:ViewallcustomersComponent, canActivate: [AuthGuard]},
    {path: 'viewallaccounts',component:ViewallaccountsComponent, canActivate: [AuthGuard]},





    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
