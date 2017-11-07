import { Injectable, OnInit } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {
	private questionsUrl = 'api/v3/questions';
	public questionModel = [];

	constructor(private http: Http) { }

	setQuestionModel(item){
		item.templateType = item.type.split('_').join(' ');
		this.questionModel.splice(item.order, 0, item);
	}

	getQuestionModel(){
		return this.questionModel;
	}

	deleteQuestionModel(item){
		this.questionModel.forEach((element, index) => {
			if(element.id == item.id){
				this.questionModel.splice(index, 1);
			}
		});
	}

	replase(obj){
		this.questionModel.splice(0,this.questionModel.length)
		obj.forEach(item => {
			item.templateType = item.type.split('_').join(' ');
			this.questionModel.push(item);
		})

		console.log(obj, 'replase')
	}

	getQuestion(qId): Observable<any>{
		return this.http
			.get(this.questionsUrl + '/' + qId)
			.map(response => {
				this.questionModel = response.json().data;
				return response.json().data;
			});
	}

	createNewQuestion(body): Observable<any> {
		return this.http
			.post(this.questionsUrl, body)
			.map(response => response.json().data);
	}

	addNewAnswer(body, id): Observable<any> {
		return this.http
			.patch(this.questionsUrl + '/' + id, body)
			.map(response => {
				console.log(response.json(), 'ress sssss ')
				return response.json().data;
			});
	}

	removeQuestion(id): Observable<any> {
		return this.http
			.delete(this.questionsUrl + '/' + id)
			.map(response => response.json());
	}

	order(body): Observable<any> {
		return this.http
			.post(this.questionsUrl + '/reorder', body)
			.map( response => response.json().data)
	}

	clearSubQuestions(entity): Observable<any> {
		return this.http
			.delete(this.questionsUrl + '/' + entity + '/clear-subquestions')
			.map(response => response.json())
	}

}
