export class Customer
{
  ssn : number=null;
   cust_id : number = null;
   cust_name : string= null;
   cust_addr : string= null;
   cust_age : number=null;
   cust_city : string= null;
   cust_state : string=null;
   cust_status : string=null;
   cust_create_date : string=null;
   cust_last_updated : string=null;

  /* public constructor(init?: Partial<Customer>)
   {
       Object.assign(this,init);
   }*/

   public constructor(instanceData?:Customer){
       if(instanceData){
           this.deserialize(instanceData);
       }
   }

   private deserialize(instanceData:Customer){

       const keys=Object.keys(this);
       for(const key of keys){
           if(instanceData.hasOwnProperty(key)){
               this[key]=instanceData[key];
           }
       }

   }
   

}
