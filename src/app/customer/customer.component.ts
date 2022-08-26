import { HttpClient } from '@angular/common/http';
import { DepFlags } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { CReference } from '../models/c-reference';
import { Customer } from '../models/customer'
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer:Customer;
  customers:Customer[];

  updateFlag:boolean = false

constructor(private httpClient: HttpClient,
    private customerService:CustomerService,) {
  
    this.customer = new Customer();
    this.customers = []; 
    
   }

  ngOnInit(): void {
   
    this.fetchCustomer();
    this.fetchReference();
   
  }
  reloadData() {
    this.customer= new Customer();
    this.fetchCustomer();
    this.fetchReference();      
   
}

fetchCustomer() {
  this.customerService.getCustomer().subscribe(
  (data) => {
    this.customers = data;
  },
  (err) => {
    console.log(err);
  }
);  
}
fetchReference() {
 
  this.customerService.getReference().subscribe(
    (data) => {
      this.customer.customerNum = data.customerNum;
    },
    (err) => {
      console.log(err);
    }
  );
}
validateCustomerData(): boolean {
  let flag = false;
 if (this.customer.sampleDate == '') {
    alert('Please enter the date');
  }
  else if (this.customer.customerName == '') {
    alert('Please enter the name');
  }else {
    flag = true;
  }
  return flag;
}
onRegister() {
  if (this.validateCustomerData()) {
    console.log('Checkpoint 1');
    //asynchronous vs synchronous programming
    this.customerService.createCustomer(this.customer).subscribe(
      (data) => {
        if (data) {
          console.log('Checkpoint 3');
          //increment hotel reference
          this.customerService.incrementCustomerNumRef().subscribe(
            (data) => {
              if (data) {
                //reload data since new record has been added
                this.reloadData();
              } else {
                alert('Error while incrementing');
              }
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          alert(
            'Error while creating'
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
    console.log('Checkpoint 2');
  }
}
     

onUpdate():boolean {
 let updateFlag=false;
  if (this.validateCustomerData()) {
    //asynchronous vs synchronous programming
    this.updateFlag = true;
    this.customerService.updateCustomer(this.customer).subscribe(
      (data) => {
        if (data) {
        
          this.reloadData();
        } else {
          alert(
            'Error while updating hotel. Please look onto the backend logs'
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }else{
  return updateFlag;
  }
}
}





    // onUpdate():boolean{
    //   let flag = false;
    //   (data) => {
    // if (data) {
    //   this.updateFlag = true;
    //   //reload data since new record has been added
    //   this.customerService.updateCustomer(this.customer).subscribe(
    //     (data) => {
    //       if (data) {
    //         console.log('Checkpoint 3'); 
    // } else {  
    //   alert('Error while update details');
    // }
    
  



