import { Observable, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import _ from 'lodash';

import { Card, IFilterValues } from '../models';
import { URLS } from '../core/environment';


@Injectable({
  providedIn: 'root',
})

export class CardService implements OnDestroy {
  private cardList$: Observable<Card[]>;
  filteredCardList$: Observable<Card[]>;
  filter$ = new BehaviorSubject<IFilterValues>(new IFilterValues());
  destroyed$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.cardList$ = http.get<Card[]>(URLS.cards).pipe(shareReplay());
    this.filteredCardList$ = combineLatest(this.cardList$, this.filter$)
      .pipe(
        map(
          ([cards, filterObj]) => {
            let result = cards;
            if (filterObj.text) {
              result = _.filter(result, card =>
                card.author.toLowerCase().includes(filterObj.text.toLowerCase()) ||
                card.title.toLowerCase().includes(filterObj.text.toLowerCase()));
            }
            if (filterObj.language && filterObj.language.length) {
              result = _.filter(result, card => filterObj.language.includes(card.language));
            }
            if (filterObj.level && filterObj.level.length) {
              result = _.filter(result, card => filterObj.level.includes(card.level));
            }
            return result;
          }
        ),
        takeUntil(this.destroyed$)
      );
  }

  getCardList(): Observable<Card[]> {
    return this.filteredCardList$;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
