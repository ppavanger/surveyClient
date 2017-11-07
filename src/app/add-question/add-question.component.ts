import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from "../service/question/question.service";
import _ from 'lodash'

@Component({
	selector: 'app-add-question',
	templateUrl: './add-question.component.html',
	styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
	answerType: any;
	@Input() item: any;
	@Input() model: any;
	public highestCodeValue = 1;
	constructor(private questionService: QuestionService) { }

	ngOnInit() {
		let listOfQuestions = this.questionService.getQuestionModel();
		let max = _.map(listOfQuestions, (item)=>{
			return parseInt(item.code)
		})
		max = _.max(max)
		console.log(max)
		if(max){
			this.highestCodeValue = max + 1;
		}
	}
	typeOfAnswer(type, code) {
		this.model.code = code;
		this.model.type = type;
		this.model.templateType = type.split('_').join(' ');
		this.model.addProcess = true;
		this.answerType = type;

	}

}
