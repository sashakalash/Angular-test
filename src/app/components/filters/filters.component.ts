import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import _ from 'lodash';

import { CardService } from 'src/app/services/card-service.service';
import { Filter } from 'src/app/models';
import { FilterService } from '../../services/filter.service';
import { prepareFilters } from '../../utilities/prepare-filters.utilities';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  search: string;
  form: FormGroup;
  filters: Filter[];
  destroyed$ = new Subject<void>();

  constructor(
    private filterService: FilterService,
    private formBuilder: FormBuilder,
    private cardService: CardService
  ) { }

  ngOnInit(): void {
    this.filterService.getFilterList().subscribe(res => {
      this.filters = res;
      this.initFormControls();
    });
  }

  initFormControls(): void {
    const objectFromProps = {};
    this.filters.forEach(f => {
      objectFromProps[f.name] = [null];
    }
    );
    Object.assign(objectFromProps, { textSearch: [null] });
    this.form = this.formBuilder.group({ ...objectFromProps });
    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => this.cardService.filter$.next(prepareFilters(_.pickBy(res, v => !_.isNull(v)))));
  }

  resetFilters(): void {
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
