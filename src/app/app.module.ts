import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from 'src/Employees/Add-Employees/Add-Employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewEmployeeComponent } from 'src/Employees/View-Employees/View-Employees.component';
import { EmployeeComponent } from 'src/Employees/Employees.component';
import { provideFirebaseApp, initializeApp, FirebaseOptions } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // Example: importing Firestore module
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FirebaseOperation } from '@angular/fire/compat/database/interfaces';
import { EmployeeService } from 'src/Services/Employee.Service';
import { ModuleComunicationService } from 'src/Services/ModuleComunication.Service';
import { DeleteConfirmationDialogComponent } from 'src/ConfirmationBox/DeleteConfirmation';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    DeleteConfirmationDialogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase as FirebaseOptions),
    AngularFireDatabaseModule,
    MatDialogModule
    
    
  ],
  providers: [
    EmployeeService,
    ModuleComunicationService
  ],
  bootstrap: [AppComponent,EmployeeComponent,AddEmployeeComponent,ViewEmployeeComponent]
})
export class AppModule { }
