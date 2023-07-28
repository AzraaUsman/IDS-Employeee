// data.service.ts
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Employee } from 'src/Modals/Employee';
import { CollectionReference } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    
    employees: Employee[] = [];
    collection: AngularFirestoreCollection<any>;
    constructor(private db: AngularFirestore) {
        //collection name
        this.collection = this.db.collection<Employee>('/Employee');
    }

    // get all
    getData(): Observable<Employee[]> {
        // 
        return this.collection.get().pipe(map(querySnapshot => {
            return querySnapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
            });
        }));
    }

    // get byId
    getById(_id: string): Observable<Employee[]> {
        return this.collection.get().pipe(
            map(querySnapshot => {
                return querySnapshot.docs
                    .filter(doc => doc.id === _id) // Filter documents that match the provided _id
                    .map(doc => {
                        return { id: doc.id, ...doc.data() };
                    });
            })
        );
    }

    //save
    saveEmployee(data: Employee) {
        return this.collection.add(data)
            .then(() => console.log('Data saved to Firebase!'))
            .catch((error) => console.error('Error saving data:', error));
    }

    //delete by id
    deleteEmployee(id: string) {
        return this.collection.doc(id).delete()
            .then(() => {
                console.log('Item deleted successfully.');
            })
            .catch((error) => {
                console.error('Error deleting item:', error);
            });
    }

    update(id: string | undefined, newData : Employee) {
        return this.collection.doc(id).update(newData)
        .then(() => {
          console.log("Data updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }
}
