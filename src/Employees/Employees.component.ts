// form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DataService } from './data.service';

@Component({
  selector: 'Employee',
  templateUrl: './Employees.component.html',

  
})
export class EmployeeComponent implements OnInit {

  constructor(){ 
  }

  ngOnInit() {
    
  }

  getEmployee(e: string) {

    if(e != "")
    console.log(e);
  }
}
