import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from "@angular/router";

import {Customer} from '../_models/index';
import{CustomerserviceService,AlertService,DataService,StateCitydataService} from '../_services/index';
import { CustomermodalsearchComponent ,AccountmodalsearchComponent} from '../_directives/index';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private customerService : CustomerserviceService,
              private dialogService:DialogService ,
              private dataService:DataService,
               private router: Router) {
                }

                showDialog(){

                let disposable = this.dialogService.addDialog(CustomermodalsearchComponent, {
                    title:'Create Customer',
                    message:"message"}).subscribe((data)=>{
                      console.log(data);
                      //navigate to view customer page
                      this.dataService.storage=data;
                      this.router.navigate(["viewcustomer/"+data['ssn']]);

                    })
                  }

                  showDialogAccount(){

                  let disposable = this.dialogService.addDialog(AccountmodalsearchComponent, {
                      title:'Search Account',
                      message:"message"}).subscribe((data)=>{
                        console.log(data);

                      })
                    }

  ngOnInit() {
  }

}
