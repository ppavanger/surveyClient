import { TestBed, inject } from '@angular/core/testing';

import { RemoveQuestionService } from './remove-question.service';

describe('RemoveQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoveQuestionService]
    });
  });

  it('should be created', inject([RemoveQuestionService], (service: RemoveQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
