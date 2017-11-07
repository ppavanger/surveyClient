import { TestBed, inject } from '@angular/core/testing';

import { SubquestionService } from './subquestion.service';

describe('SubquestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubquestionService]
    });
  });

  it('should be created', inject([SubquestionService], (service: SubquestionService) => {
    expect(service).toBeTruthy();
  }));
});
