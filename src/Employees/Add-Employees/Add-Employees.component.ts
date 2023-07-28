// form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DataService } from './data.service';
import { Database,DatabaseInstances } from '@angular/fire/database/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // Example: importing Firestore module
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Employee, EmployeeDataWithId } from 'src/Modals/Employee';
import { EmployeeService } from 'src/Services/Employee.Service';
import { ModuleComunicationService } from 'src/Services/ModuleComunication.Service';

@Component({
  selector: 'Add-Employee',
  templateUrl: './Add-Employees.component.html',

  providers: [
    
  ],
})
export class AddEmployeeComponent implements OnInit {
  form : any ;
  nameValidation : RegExp;
  receivedID: string | undefined;
  EditMode: boolean = false;
  editEmployee: EmployeeDataWithId[] = [];

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private comService: ModuleComunicationService) {
    this.nameValidation = new RegExp("^[A-Za-z ]+$");
    
    this.initializeform();

    this.comService.data$.subscribe((id) => {
      this.receivedID = id;

      //if an Employee id is there
      if(this.receivedID){
        this.EditMode = true;
        employeeService.getById(this.receivedID).subscribe(emp =>{
          // console.log(e);
          this.editEmployee = (emp as any);
          this.initializeform(this.editEmployee);
        })
      }
    });
    
  }

  ngOnInit() {
    
    
  }

  initializeform(emp : any = null){

    //create forms with validators
    this.form = this.formBuilder.group({
      Name: [emp ? emp[0].Name : '', Validators.required],
      Designation: [emp ? emp[0].Designation : '', Validators.required],
      Salary: [emp ? emp[0].Salary : '', Validators.required]
    });

  }

  onSubmit(){}

  save() {
    let _emp = new Employee();
    if (this.form.valid) {
      
      //get the data from formcontrol
      _emp.Name = this.form.get('Name')?.value;
      _emp.Designation = this.form.get('Designation')?.value;
      _emp.Salary = this.form.get('Salary')?.value;
      
      
      // add the data to oBject firbase expect async Object
      let data = { Name: _emp.Name, Designation: _emp.Designation, Salary:_emp.Salary };
      this.saveDataToFirebase(data);

    }
  }

  // save function
  saveDataToFirebase(data: any) {
    this.employeeService.saveEmployee(data as Employee).then(() => {

      //clear the form after save successfully
      this.initializeform();
    })
    .catch(e => {
      //log the errror
      console.log(e)
    });
    
  }

  reset(){
    this.initializeform(this.EditMode ? this.editEmployee : null);
  }

  update(){
    let _emp = new Employee();
    if (this.form.valid) {
      
      //get the data from formcontrol
      _emp.Name = this.form.get('Name')?.value;
      _emp.Designation = this.form.get('Designation')?.value;
      _emp.Salary = this.form.get('Salary')?.value;
      
      
      // add the data to oBject firbase expect async Object
      let data = { Name: _emp.Name, Designation: _emp.Designation, Salary:_emp.Salary };
      this.employeeService.update(this.editEmployee[0]?.id, data).then(() => {

        //clear the form after update successfully
        this.initializeform();
      })
      .catch(e => {
        //log the errror
        console.log(e)
      });

      this.EditMode = false;
      this.editEmployee = [];

    }
    
  }
}
