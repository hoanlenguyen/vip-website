import { Subject } from 'rxjs';
import { OnDestroy, Injectable } from "@angular/core";

@Injectable()
export class DestroyUtil extends Subject<void> implements OnDestroy{
    
    constructor() {
        super()
    }

    ngOnDestroy() {
        this.next();
        this.complete();
    }
}