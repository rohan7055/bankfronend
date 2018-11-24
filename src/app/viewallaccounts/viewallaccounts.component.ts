import { Component, OnInit } from '@angular/core';
import {Account} from '../_models/index';
import {DataService} from '../_services/index';
import {AccountService} from '../_services/index';

@Component({
  selector: 'app-viewallaccounts',
  templateUrl: './viewallaccounts.component.html',
  styleUrls: ['./viewallaccounts.component.css']
})
export class ViewallaccountsComponent implements OnInit {

  model:any;
  accounts : Account[]=[];
  constructor(private dataService:DataService,
              private accountService:AccountService) { }

  ngOnInit() {
    this.loadTable();
  }

  loadTable(){
    this.accountService.viewAllAccounts().subscribe(
      data=>{
        console.log(data)
        for(let acct of data['accounts'])
            {
             this.accounts.push(new Account(acct))
              console.log(acct['acct_id'])
            }

      },
      error=>{

      }
    )
  }

}
