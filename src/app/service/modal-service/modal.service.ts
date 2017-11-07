import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ModalSevice {
	public removeQuestionId;
	public questionItem: any[] = [];
	public modalIsVisible: any[] = [];
	@Output() modalIsVisibleWithCustomText = new EventEmitter;

	constructor() { }

	getModalIsVisible(){
		return this.modalIsVisible
	}

	setModalIsVisible(){
		this.modalIsVisible.splice(0, this.modalIsVisible.length);
	}

	open(event:any, item:any, text:string){
		this.modalIsVisibleWithCustomText.emit([text]);
		this.modalIsVisible.push(item);
	}

	delete(id) {
		return this.removeQuestionId = id;
	}
	replace(text: String, key, model){
		this.modalIsVisibleWithCustomText.emit([text, key, model]);
		this.modalIsVisible.push(true);
	}

}
