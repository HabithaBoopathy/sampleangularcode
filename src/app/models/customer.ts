export class Customer {
    // setValue(arg0:{customerNum:any}){
    //     throw new Error('method not implemented');
    // }
    // get(arg0:string)
    // {
    //     throw new Error('Method not implemented');
    // }
    id:string;
    customerNum: number;
    sampleDate:string;
    customerName:string;

    constructor(){
        this.id='';
        this.customerNum=null;
        this.sampleDate='';
        this.customerName='';
    }
}
