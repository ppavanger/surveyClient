import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from "../service/question/question.service";
import { Subscription } from "rxjs/Subscription";
import { RemoveQuestionService } from "../service/remove-question/remove-question.service";
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-remove-question',
  templateUrl: './remove-question.component.html',
  styleUrls: ['./remove-question.component.scss']
})
export class RemoveQuestionComponent implements OnInit {
	@Input() item: any;
	private subscription: Subscription;
	public hideSubject = new Subject();

	constructor(private questionService: QuestionService, private removeQuestionService: RemoveQuestionService) { }
	ngOnInit() {
		this.subscription = this.removeQuestionService.removeSubject
			.subscribe( state => {
				if(state[0].delete){
					this.removeAnswer(state[2], state[1].item)
					return
				}
			});
	}

	removeAnswer(event, item) {
		this.questionService.removeQuestion(item.id).subscribe( res => {
			location.reload();
		}, err => {
			console.log(err);
		})
		event.stopPropagation();
	}


	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}
