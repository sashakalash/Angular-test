import _ from 'lodash';

import { LANGUAGES, LEVELS } from '../core/constants';
import { IFilterParams, IFilterValues } from '../models';


export const prepareFilters = (val: IFilterParams): IFilterValues => {
  return _.reduce(_.keys(val), (res, key) => {
    switch (key) {
      case LANGUAGES.EN:
      case LANGUAGES.RU:
        if (val[key]) {
          res.language.push(key);
        }
        return res;
      case LEVELS.ACADEMIC:
      case LEVELS.HARDCORE:
      case LEVELS.HOT:
      case LEVELS.INTERMEDIATE:
      case LEVELS.ADVANCED:
        if (val[key]) {
          res.level.push(key);
        }
        return res;
      default:
        if (val[key] !== '') {
          res.text = val[key];
        }
        return res;
    }
  }, { language: [], level: [], text: '' });
};
