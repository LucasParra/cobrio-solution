import { Observable } from 'rxjs';

const createObservable = payload => {
  return new Observable(observer => {
    observer.next(payload);
  });
};

export { createObservable };
