import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiUserService } from './user.service';

describe('UserService', () => {
  let service: ApiUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiUserService]
    });
    service = TestBed.inject(ApiUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
