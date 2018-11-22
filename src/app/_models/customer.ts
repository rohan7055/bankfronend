export class Customer 
{
    ssn : number;
    cust_id : number = null;
    cust_name : string;
    cust_addr : string;
    cust_age : number;
    cust_city : string;
    cust_state : string;
    cust_status : string;
    cust_create_date : string;
    cust_last_updated : string;

    public constructor(init?: Partial<Customer>)
    {
        Object.assign(this,init);
    }
    
}
