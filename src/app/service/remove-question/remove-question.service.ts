import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RemoveQuestionService {

  	public removeSubject = new Subject();

    constructor() { }

    delete(event, item) {
        this.removeSubject.next([{delete:true},{item: item }, event]);
        return
    }

    close(item) {
        item.hideAddBlock = false;
        this.removeSubject.next([{close: true}, {item: item }]);
    }

}
