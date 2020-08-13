import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Filter } from '../models';
import { URLS } from '../core/environment';


@Injectable({
  providedIn: 'root',
})

export class FilterService {

  constructor(private http: HttpClient) {
  }

  getFilterList(): Observable<Filter[]> {
    return this.http.get<Filter[]>(URLS.filters);
  }
}
