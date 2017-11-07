import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef, HostListener } from '@angular/core';
import { QuestionService } from "../../service/question/question.service";
import { QuestionListComponent } from "../../question-list/question-list.component";
import { TypeOfAnswerComponent } from "../type-of-answer/type-of-answer.component";
import { SubquestionService } from "../../service/subquestion/subquestion.service";
import { RemoveQuestionService } from "../../service/remove-question/remove-question.service";
import { ModalSevice } from "../../service/modal-service/modal.service";
import _ from 'lodash'
import { QuestionSetsService } from "../../service/question-set/question-set.service";

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit {
	questionOption: Array<any> = [ ];
	private questionId: any;
	@Input() questionModel: any;
	public setsArr;
	@Input() question: any;
	@Input() model: any;
	@Input() item: any;
	@Output() closeAnswerBlock = new EventEmitter();
	public loading = false;
	public selectedSetOption:any;

	constructor(
		private questionService: QuestionService,
		private typeOfAnswerComponent: TypeOfAnswerComponent,
		private subquestionService: SubquestionService,
		private removeQuestionService: RemoveQuestionService,
		private questionListComponent: QuestionListComponent,
		private modalSevice: ModalSevice,
		private questionSetsService: QuestionSetsService,
	) { }

	ngOnInit() {
		if(this.model.name){
			this.question = this.model.name;
		}
		this.typeOfAnswerComponent.questionModel.subscribe(res => {},err => {
			console.log(err);
		})

		this.getsets()
	}

	getsets(){
		this.setsArr = this.questionSetsService.getSets()
	}

	/**
	 *
	 * @param event
	 * find max subquestion key in model
	 */
	addOption(event) {
		this.loading = true;
		//will return undefined if arr is empty!!!!
		let a = _.maxBy(this.model.subQuestions, (i) => {
			return parseInt(i.key);
		})
		event.stopPropagation();
		// if subQuestions is empty
		if(!a){
			this.pushToSubquestionArr(0);
			return
		}
		this.pushToSubquestionArr(a.key);
	}

	/**
	 *
	 * @param index index of max subquestion key
	 * push to model new subquestion with index + 1
	 */
	pushToSubquestionArr(index){
		console.log(index++, index + 1)
		this.model.subQuestions.push({key: index++ });
		this.loading = false;
	}

	/**
	 *
	 * @param index of subquestion
	 * @param id
	 * remove subquestion from model
	 */
	removeOption(index, id) {
		this.model.subQuestions.splice(index, 1);
		this.subquestionService.removeSubquestion(id).subscribe( res => {
			console.log(res);
		}, err => {
			console.log(err);
		})
	}

	/**
	 *
	 * @param item full question object
	 * @param question question ng-model string
	 * @param event
	 * @param el HTML element
	 */
	createQestion(item, question, event, el){
		if(el){
			el.blur()
			return
		}
		this.loading = true;
		// check if question exist or just added for send post or patch
		if(this.item.id && !this.model.addProcess){

			this.questionService.addNewAnswer({name: question}, this.item.id).subscribe( res => {
				this.loading = false;
				console.log(res)
			}, err => {
				console.log(err)
			})
			event.preventDefault();
			return
		}

		let obj = {
			questionCollection: this.model.studyId,
			type: this.model.type,
			name: question,
			order: this.item.order || 1,
			code: this.model.code,
		}
		this.questionService.createNewQuestion(obj).subscribe( newQuestionObj => {
			this.questionId = newQuestionObj.id;
			this.questionService.setQuestionModel(newQuestionObj);
			// Move to the service
			let updatedIndex = {
				data: []
			};
			let getModel = this.questionService.getQuestionModel();

			getModel.forEach((el, i) => {
				let obj = {
					id: el.id,
					index: i + 1
				};
				updatedIndex.data.push(obj);
			})

			this.questionService.order(updatedIndex).subscribe( res => {
				this.questionService.replase(res);

			}, err => {
				console.log(err)//
			})

			this.close(item);
			this.questionListComponent.edit(item, newQuestionObj.order, event);
			this.loading = false;
		}, err => {
			console.log(err)
		})
	}

	/**
	 *
	 * @param answer
	 * @param key
	 * @param id
	 * @param $event
	 * @param el
	 */
	addAnswer(answer, key, id, $event, el){
		if(el){
			el.blur()
			return
		}
		// check if answer exist or just added for send post or patch
		if(id){
			this.subquestionService.changeSubquestion({name: answer}, id).subscribe( res => {
			}, err => {
				console.log(err)
			})
			return
		}
		let obj = {
			name: answer,
			key: key,
			question: this.model.id
		}
		this.subquestionService.createNewSubquestion(obj).subscribe( res => {
			//set new subQuestion obj into current model
			this.model.subQuestions.forEach((element, index) => {
				if(element.key == res.key){
					this.model.subQuestions[index] = res
				}
			});
		}, err => {
			console.log(err)
		})
	}

	close(item) {
		this.removeQuestionService.close(item)
	}
	/**
	 *
	 * @param event
	 * @param item
	 * remove qustion item, open model
	 */

	remove(event, item){
		this.modalSevice.open(event, item, "Are you sure you want to delete")
		event.stopPropagation();
	}

	selectedSet(selectedValue, model){
		if(selectedValue === 'clear'){ // check if none selected to remove all subQuestions
			this.questionService.clearSubQuestions(model.id).subscribe(res => {
				model.subQuestions.splice(0, model.subQuestions.length);
			}, err => console.log(err))
			return
		}

		let selectedObj = _.find(this.setsArr, { 'key': selectedValue});
		this.modalSevice.replace("This will replace answer option", selectedValue, model)
	}

}
