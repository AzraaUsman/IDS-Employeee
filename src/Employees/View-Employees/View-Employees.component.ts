// form.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee, EmployeeDataWithId } from 'src/Modals/Employee';
import { EmployeeService } from 'src/Services/Employee.Service';
import { ModuleComunicationService } from 'src/Services/ModuleComunication.Service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/ConfirmationBox/DeleteConfirmation';

@Component({
  selector: 'app-view-employee',
  templateUrl: './View-Employees.component.html',
})
export class ViewEmployeeComponent implements OnInit {

  emp: EmployeeDataWithId[] = [];
  @Output() EditEmployee :EventEmitter<string> = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder,
     private employeeService: EmployeeService,
     private db: AngularFirestore,
     private comService: ModuleComunicationService,
     private dialog: MatDialog) {

    //when there is a value change in db valuchanges will detect it
    this.db.collection<Employee>('/Employee').valueChanges().subscribe(() => {
      
      //get all the data
      employeeService.getData().subscribe(data => {
        this.emp = []; // make the array empty before adding
        data.forEach((e: any) =>
          this.emp.push(e)); // add each data to array
        // console.log(this.emp)

      });
    })

  }

  ngOnInit() {

  }

  Delete(id: string) {
    // console.log(id);
    //delete the record
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete ?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Code to perform the delete operation
        console.log('Item deleted!');
        this.employeeService.deleteEmployee(id);
        // Implement your actual delete logic here
      }
    });
    
  }

  Edit(id: string) {
    console.log(id);
    this.comService.sendData(id);
  }
}
