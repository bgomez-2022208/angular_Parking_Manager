import { TestBed } from '@angular/core/testing';

import {ApiUserService, } from './user.service';

describe('UserService', () => {
  let service: ApiUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
