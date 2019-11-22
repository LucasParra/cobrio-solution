import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Element } from './../interfaces/Element';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}
  getElements(id: string = '') {
    return this.http.get<[Element]>(`http://localhost:3000/items/${id}`);
  }
}
