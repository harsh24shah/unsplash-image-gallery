/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImageDetailService } from './image-detail.service';

describe('Service: ImageDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageDetailService]
    });
  });

  it('should ...', inject([ImageDetailService], (service: ImageDetailService) => {
    expect(service).toBeTruthy();
  }));
});
