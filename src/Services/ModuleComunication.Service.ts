// data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ModuleComunicationService {

    private dataSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
    data$ = this.dataSubject.asObservable();
    constructor() {

    }


    //send data to othercompnents
    sendData(data: string) {
        this.dataSubject.next(data);
    }


}
