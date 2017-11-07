import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionCollectionService {

	constructor(private http: Http) { }

	getQuestionCollection(studyId: any){
		return this.http
			.get('api/v3/question-collection/'+ studyId +'/questions')
			.map(response => !response.json() ? response.json() : response.json().data);
	}
}
