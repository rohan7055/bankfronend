export class User {
    cust_id: number=null;
    ssn: number=null;
    
    public constructor(instanceData?:User){
        if(instanceData){
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData:User){

        const keys=Object.keys(this);
        for(const key of keys){
            if(instanceData.hasOwnProperty(key)){
                this[key]=instanceData[key];
            }
        }

    }
}
