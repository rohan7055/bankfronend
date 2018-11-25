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
    console.log("Data",this.dataService.storage)
    //this.model=JSON.parse(this.dataService.storage);
    this.customer = new Customer(this.dataService.storage);

  console.log(this.customer); }

  ngOnInit() {
  }

}
