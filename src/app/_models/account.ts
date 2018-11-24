export class Account {

  cust_id: number=null;
  acct_type : string=null;
  acct_balance : number=null;
  acct_id: number=null;
  acct_status: string=null;
  acct_last_updated: string=null;

  public constructor(instanceData?:Account){
      if(instanceData){
          this.deserialize(instanceData);
      }
  }

  private deserialize(instanceData:Account){

      const keys=Object.keys(this);
      for(const key of keys){
          if(instanceData.hasOwnProperty(key)){
              this[key]=instanceData[key];
          }
      }

  }
}
