import { Component, OnInit } from '@angular/core';
import {DataService} from '../_services/index';

@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.css']
})
export class ViewcustomerComponent implements OnInit {
  data:any;

  constructor(private dataService:DataService) {
    this.data=JSON.stringify(this.dataService.storage);
  console.log(JSON.stringify(this.dataService.storage)); }

  ngOnInit() {
  }

}
