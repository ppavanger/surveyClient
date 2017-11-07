import { Component, OnInit, Output, Injectable } from '@angular/core';
import { ModalSevice } from "../service/modal-service/modal.service";
import { QuestionService } from "../service/question/question.service";


@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
@Injectable()
export class ModalComponent implements OnInit {
	public modalIsVisible: any;
	public text: any;
	public key;
	public questionModel: any;

	constructor(
		private modalSevice: ModalSevice,
		private questionService: QuestionService
	) { }

	ngOnInit() {
		this.modalIsVisible = this.modalSevice.getModalIsVisible()
		this.modalSevice.modalIsVisibleWithCustomText.subscribe(res => {
			this.text = res[0];
			this.key = res[1];
			this.questionModel = res[2];
		})
	}

	open(){
		this.modalIsVisible = true;
	}

	close(){
		this.modalSevice.setModalIsVisible();
	}

	delete(){
		let id = this.modalSevice.getModalIsVisible();
		console.log(id[0].id)
		this.questionService.removeQuestion(id[0].id).subscribe( res => {
			this.questionService.deleteQuestionModel(id[0]);
			this.close()
		}, err => {
			console.log(err);
			this.close()
		})
		// event.stopPropagation();

	}
	replace(key, question){
		console.log(key, question)
		this.questionService.addNewAnswer({"qSet": key}, question.id).subscribe( res => {
			this.close();
			question.subQuestions = [];
			res.subQuestions.forEach(element => {
				question.subQuestions.push(element)
			});
			console.log(question)
		}, err => {
			console.log(err)
			this.close()
		})


	}
}
