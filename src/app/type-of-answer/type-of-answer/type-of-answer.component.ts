import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionListComponent } from "../../question-list/question-list.component";

@Component({
	selector: 'app-type-of-answer',
	templateUrl: './type-of-answer.component.html',
	styleUrls: ['./type-of-answer.component.scss']
})
export class TypeOfAnswerComponent implements OnInit {
	@Input() model: any;
	@Input() item: any;
	@Input() edit: any;
	@Output() questionModel = new EventEmitter();

	constructor(
		private questionListComponent: QuestionListComponent
	) { }

	ngOnInit() {
		if(!this.model){
			this.model = this.item;
		}
		this.model.type.split('_').join(' '); //parse type of question

		this.questionListComponent.editEvent.subscribe(res => {
			res.model = this.model;
			this.questionModel.emit([this.item, res]);
		},err => {
			console.log(err);
		})
	}



}
