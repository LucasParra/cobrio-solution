import { TestBed } from '@angular/core/testing';

import { MainService } from './main.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as sinon from 'sinon';
import { createObservable } from 'src/test/utils';

describe('MainService', () => {
  let service: MainService;
  const fakeHttp = {
    get: sinon.fake(() => createObservable('dummy-data')),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    TestBed.overrideProvider(HttpClient, {
      useValue: fakeHttp,
    });
    service = TestBed.inject(MainService);
  });

  it('Should Create the Service and call to the corrects url depending of the params', done => {
    expect(service).toBeTruthy();
    service.getElements('dummy-id');
    service.getElements().subscribe((data: any) => {
      expect(data).toBe('dummy-data');
      expect(fakeHttp.get.getCall(0).args[0]).toBe('http://localhost:3000/items/dummy-id');
      expect(fakeHttp.get.getCall(1).args[0]).toBe('http://localhost:3000/items/');
      done();
    });
  });
});
