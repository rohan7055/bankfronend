import { Component, OnInit,DoCheck,OnChanges,AfterViewChecked } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {User} from '../_models/index';
import {Customer} from '../_models/index';
import{CustomerserviceService,AlertService,DataService,StateCitydataService} from '../_services/index';
import { CustomermodalsearchComponent ,AccountmodalsearchComponent} from '../_directives/index';
import { DialogService } from "ng2-bootstrap-modal";





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewChecked{

  tabhide:boolean=true;
  user:User;



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

  


    ngAfterViewChecked(){
      if (localStorage.getItem('currentUser')) {
          // logged in so return true
          this.user = JSON.parse(localStorage.getItem('currentUser'));
          console.log(this.user['ssn'])
          console.log(localStorage.getItem('currentUser'))
        this.tabhide=true;
      }else{
        this.tabhide=false;
      }
    }



}
