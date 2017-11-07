import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import _ from 'lodash';

@Injectable()
export class QuestionSetsService {
	private questionsUrl = 'api/v3/question/sets';

	@Output() questionSetsArr = new EventEmitter;
	public arr = []

	constructor(private http: Http) { }

	getQuestionSets(): Observable<any>{
		return this.http
			.get(this.questionsUrl)
			.map(response => {
				let data = new Array(response.json().data);
				let a = _.values(data["0"]);
				a.forEach(element => {
					this.arr.push(element);
				});
				this.questionSetsArr.emit(this.arr);
				return data;
			});

	}

	getSets(){
		return this.arr
	}

}
