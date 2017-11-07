import { Component, OnInit, NgModule, Output, EventEmitter, Input } from '@angular/core';
import { Http } from "@angular/http";
import { AppComponent } from "../app.component";
import { QuestionService } from "../service/question/question.service";
import { Subscription } from "rxjs/Subscription";
import { RemoveQuestionService } from "../service/remove-question/remove-question.service";

@Component({
	selector: 'app-question-list',
	templateUrl: './question-list.component.html',
	styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit{
	@Input() model: any;
	@Output() editEvent = new EventEmitter();
	@Input() updateList: any;
	public questions: any;
	public item = {};
	public listOfQuestions = [];
	public showAddQuestionTypeBlock = false;
	public showAnswer;
	private subscription: Subscription;

	constructor(public http: Http,
				private appComponent: AppComponent,
				private questionService: QuestionService,
				private removeQuestionService: RemoveQuestionService,
	) { }

	ngOnInit() {
		this.listOfQuestions = this.questionService.getQuestionModel()
		this.subscription = this.removeQuestionService.removeSubject
			.subscribe( close => {
				if(close[0].close){
					this.showAnswer = this.listOfQuestions.length + 1;
					this.closeAnswerBlock(close[1].item)
				}
			})

		this.appComponent.questionList.subscribe(res => {

			if(res.length > 0){
				this.listOfQuestions = res.map( item => {
					item.templateType = item.type.split('_').join(' ');
					return item;
				})
				this.model.lengthOfListQuestion = res.length;
			}else{
				console.log(this.listOfQuestions)
			}
		})
	}

	closeAnswerBlock(item) {
		item.showAddQuestionTypeBlock = false;
		item.showAddQuestionAnswer = false;
	}

	edit(item, index, event) {
		this.showAnswer = index;
		item.show = false;
		item.hideAddBlock = true;
		this.editEvent.emit(item)

		event.stopPropagation();
	}

	dragOneSuccessCallback(i){
		console.log(i);
		//let index = i + 1;
		if(this.listOfQuestions.length > 1){
			let updatedIndex = {
				data: []
			};
			for (let i = 0; i < this.listOfQuestions.length; i++) {
				let obj = {
					id: this.listOfQuestions[i].id,
					index: i + 1
				};
				updatedIndex.data.push(obj);
			}

			this.questionService.order(updatedIndex).subscribe( res => {
				console.log(res)
			}, err => {
				console.log(err)//
			})
		}
	}

	remove(event, item){
		this.questionService.removeQuestion(item.id).subscribe( res => {
			this.questionService.deleteQuestionModel(item)
		}, err => {
			console.log(err);
		})
		event.stopPropagation();
	}
}
