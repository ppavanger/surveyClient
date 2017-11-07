import { TestBed, inject } from '@angular/core/testing';

import { ModalSevice } from './modal.service';

describe('ModalSevice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalSevice]
    });
  });

  it('should be created', inject([ModalSevice], (service: ModalSevice) => {
    expect(service).toBeTruthy();
  }));
});
