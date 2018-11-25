import { Component, OnInit,DoCheck,OnChanges,AfterViewChecked } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {User} from '../_models/index';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewChecked{

  tabhide:boolean=true;
  user:User;


  constructor() {
      // clear alert message on route change

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
