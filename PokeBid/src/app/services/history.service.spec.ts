import { TestBed, getTestBed} from '@angular/core/testing';

import { HistoryService } from './history.service';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { History } from '../models/history';
import { timestamp } from 'rxjs';

fdescribe('HistoryService', () => {
  let service: HistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HistoryService],
    });
    service = TestBed.inject(HistoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });
 
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve history from Database', () =>{
    const dummyPost: History[] = [
      {
        id: "d742d5ef-945d-4dd9-93e1-f1f5b430f67a" ,
        status: {
        id: "1c8439b2-85a6-4ab5-b77e-b8a2bf2998ff" ,
        status: "PURCHASED" 
        }
      }
    ];

    service.getHistory().then(history =>{
      expect(history.length).toBe(1);
    }) 

    const request = httpMock.expectOne(`${service.historyURL}`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyPost);
 })
});
