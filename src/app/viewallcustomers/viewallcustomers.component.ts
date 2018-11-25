import { Component, OnInit } from '@angular/core';
import {Customer} from '../_models/index';
import {DataService} from '../_services/index';
import {CustomerserviceService} from '../_services/index';


@Component({
  selector: 'app-viewallcustomers',
  templateUrl: './viewallcustomers.component.html',
  styleUrls: ['./viewallcustomers.component.css']
})
export class ViewallcustomersComponent implements OnInit {
    model:any;
    customers : Customer[]=[];



  constructor(private dataService:DataService,
              private customerService : CustomerserviceService) {
       }



  ngOnInit() {
      this.customerService.viewallcustomers().subscribe(
              data=>{
                  console.log(data)
                  for(let cust of data['customers'])
                      {
                       this.customers.push(new Customer(cust))
                        console.log(cust['cust_id'])
                      }
              },
              error=>{

              }
              )

  }

  /*public loadData() {
        this.http.get("/app/data.json")
            .subscribe((data) => {
                setTimeout(() => {

                    this.data = _.orderBy(data.json(), this.sortBy, [this.sortOrder]);
                    this.data = _.slice(this.data, (this.activePage-1)*this.rowsOnPage, (this.activePage-1)*this.rowsOnPage + this.rowsOnPage);
                    this.itemsTotal = data.json().length;
                }, 2000);
            });
    }

   public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    public remove(item) {
        let index = this.data.indexOf(item);
        if (index > -1) {
            this.data.splice(index, 1);
        }
    }
    public onPageChange(event) {
        this.rowsOnPage = event.rowsOnPage;
        this.activePage = event.activePage;
        this.loadData();
    }

    public onSortOrder(event) {
        this.loadData();
    }*/



}
