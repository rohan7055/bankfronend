import { Component, OnInit } from '@angular/core';
import {DataService} from '../_services/index';
import {Customer} from '../_models/index';


@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.css']
})
export class ViewcustomerComponent implements OnInit {
model:any;
customer : any;



  constructor(private dataService:DataService) {
    this.model=JSON.stringify(this.dataService.storage);
    this.customer = JSON.parse(this.model);

  console.log(this.customer); }

  ngOnInit() {
  }

}
