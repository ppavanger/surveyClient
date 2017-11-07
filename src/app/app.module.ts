import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule, XHRBackend, RequestOptions, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { DndModule } from 'ng2-dnd';
import { MultipleChoiceComponent } from './type-of-answer/multiple-choice/multiple-choice.component';
import { httpFactory } from "./service/api/http.factory";
import { RouterModule }   from '@angular/router';
import { QuestionCollectionService } from "./service/question-collection/question-collection.service";
import { QuestionService } from "./service/question/question.service";
import { SubquestionService } from "./service/subquestion/subquestion.service";
import { AddQuestionComponent } from './add-question/add-question.component';
import { RemoveQuestionComponent } from './remove-question/remove-question.component';
import { TypeOfAnswerComponent } from './type-of-answer/type-of-answer/type-of-answer.component';
import { RemoveQuestionService } from "./service/remove-question/remove-question.service";
import { ModalComponent } from './modal/modal.component';
import { ModalSevice } from './service/modal-service/modal.service'
import { QuestionSetsService } from "./service/question-set/question-set.service";


@NgModule({
	declarations: [
		AppComponent,
		QuestionListComponent,
		MultipleChoiceComponent,
		AddQuestionComponent,
		RemoveQuestionComponent,
		TypeOfAnswerComponent,
		ModalComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		RouterModule.forRoot([]),
		DndModule.forRoot(),
	],
	providers: [
		RemoveQuestionService,
		{
			provide: Http,
			useFactory: httpFactory,
			deps: [XHRBackend, RequestOptions]
		},
		QuestionCollectionService, QuestionService, SubquestionService, ModalSevice,
		QuestionSetsService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
