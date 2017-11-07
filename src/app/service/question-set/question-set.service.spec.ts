import { TestBed, inject } from '@angular/core/testing';

import { QuestionSetsService } from './question-set.service';

describe('QuestionSetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionSetsService]
    });
  });

  it('should be created', inject([QuestionSetsService], (service: QuestionSetsService) => {
    expect(service).toBeTruthy();
  }));
});
