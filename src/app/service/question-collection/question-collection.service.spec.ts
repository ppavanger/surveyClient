import { TestBed, inject } from '@angular/core/testing';

import { QuestionCollectionService } from './question-collection.service';

describe('QuestionCollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionCollectionService]
    });
  });

  it('should be created', inject([QuestionCollectionService], (service: QuestionCollectionService) => {
    expect(service).toBeTruthy();
  }));
});
