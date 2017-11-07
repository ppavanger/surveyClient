import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Http } from "@angular/http";
import {Router, Params, ActivatedRoute} from '@angular/router';
import { QuestionCollectionService } from "./service/question-collection/question-collection.service";
import { QuestionService } from './service/question/question.service'
import { QuestionSetsService } from "./service/question-set/question-set.service";


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	@Output() questionList = new EventEmitter();

	taskOption = {
		studyId: null,
		taskId: null
	};

	constructor(public http: Http,
				private route: ActivatedRoute,
				private questionCollection: QuestionCollectionService,
				private questionService: QuestionService,
				private questionSetsService: QuestionSetsService
	) { }

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			let token = params.token
			localStorage.setItem('token', token);
			this.taskOption.studyId = params.studyId;
			this.taskOption.taskId = params.taskId;
			if(params.studyId){
				this.questionSetsService.getQuestionSets().subscribe(sets =>{}, err => {// get sets
					console.log(err)
				})
				this.questionCollection.getQuestionCollection(params.studyId).subscribe( res => {
					//this.questionList.emit(res);
					res.forEach(element => {
						this.questionService.setQuestionModel(element);
					});

				}, err => {
					console.log(err)
				})
			}
      	}, err => {
			  console.log(err)
		  });
	};
}
