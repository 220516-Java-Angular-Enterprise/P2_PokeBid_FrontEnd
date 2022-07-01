import { Status } from 'src/app/models/status';
import { TestBed, getTestBed } from '@angular/core/testing';

import { StatusService } from './status.service';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

fdescribe('StatusService', () => {
  let service: StatusService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatusService],
    });
    service = TestBed.inject(StatusService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve statuses from Database', () =>{
    const dummyPost: Status[] = [
      {id: '1e207de7-49d2-4963-8c0d-55095be5bda8', status: 'ONGOING'},
      {id: '0ac1b2da-a838-4b68-84cf-28b68a9f3beb', status: 'SOLD'},
    ];

    service.getAllStatus().then(status =>{
      expect(status.length).toBe(2);
      expect(status).toEqual(dummyPost);
    }) 

    const request = httpMock.expectOne(`${service.statusURL}`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyPost);
 })

})