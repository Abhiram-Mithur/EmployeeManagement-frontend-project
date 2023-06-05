import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  CustomerArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  
  firstName: string = '';
  lastName: string = '';
  salutation: string = '';
  dob: string = '';
  currentCustomerID = '';
 
  constructor(private http: HttpClient) {
    this.getAllCustomer();
  }
 
  getAllCustomer() {
    this.http.get<any[]>("http://localhost:8080/api/v1/employee/getAllCustomer")
      .subscribe((resultData: any[]) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.CustomerArray = resultData;
      });
  }
  
  register() {
    let bodyData = {
      firstName: this.firstName,
      lastName: this.lastName,
      salutation: this.salutation,
      dob: this.dob
    };
  
    this.http.post("http://localhost:8080/api/v1/employee/create", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Employee Registered Successfully");
      this.getAllCustomer();
     
    });
  }
  
  
  setUpdate(data: any) {
    this.currentCustomerID = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.salutation = data.salutation;
    this.dob = data.dob;
    this.isUpdateFormActive = true;
  }
  
  UpdateRecords() {
    let bodyData = {
      id: this.currentCustomerID,
      firstName: this.firstName,
      lastName: this.lastName,
      salutation: this.salutation,
      dob: this.dob
    };
  
    this.http.put("http://localhost:8080/api/v1/employee/update", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Employee Updated");
      this.getAllCustomer();
    });
  }
  
  save() {
    if (this.currentCustomerID === '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }
  
  setDelete(data: any) {
    this.http.delete(`http://localhost:8080/api/v1/employee/deletecustomer/${data.id}`, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Employee Deleted");
      this.getAllCustomer();
    });
  }
  
}
