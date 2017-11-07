import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SubquestionService {
	private getSubquestionLink = 'api/v3/subquestions';

	constructor(private http: Http) { }

	getSubquestion(sqid){
		return this.http
			.get(this.getSubquestionLink + '/' + sqid)
			.map(response => response.json().data);
	}

	createNewSubquestion(body) {
		return this.http
			.post(this.getSubquestionLink, body)
			.map( response => response.json().data);
	}

	changeSubquestion(body, id) {
		return this.http
			.patch(this.getSubquestionLink + '/' + id, body)
			.map( response => response.json().data)
	}

	removeSubquestion(id) {
		return this.http
			.delete(this.getSubquestionLink + '/' + id)
			.map( response => response.json())
	}
}
