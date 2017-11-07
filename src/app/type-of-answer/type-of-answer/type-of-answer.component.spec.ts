import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfAnswerComponent } from './type-of-answer.component';

describe('TypeOfAnswerComponent', () => {
  let component: TypeOfAnswerComponent;
  let fixture: ComponentFixture<TypeOfAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
