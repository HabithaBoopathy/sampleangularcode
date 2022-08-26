import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CReference } from '../models/c-reference';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  URL='http://localhost:8090/';
  constructor(private http:HttpClient) { }
  createCustomer(customer:Customer): Observable<boolean> {
    return this.http.post<boolean>(`${this.URL}customer`, customer);
  }
  getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.URL}customer`);
  }
  getReference(): Observable<CReference> {
    return this.http.get<CReference>(`${this.URL}reference`);
  }
  incrementCustomerNumRef(): Observable<Boolean> {
    return this.http.get<Boolean>(
      `${this.URL}reference/increment/customerNum`
    );
  }
  updateCustomer(customer:Customer): Observable<boolean> {
    return this.http.put<boolean>(`${this.URL}customers`, customer);
  }
}
