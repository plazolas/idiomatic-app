import { Pipe, PipeTransform } from '@angular/core';
import {Item} from '../models/item.model';

@Pipe({
  name: 'filterItemsPipe'
})
export class FilterItemsPipe implements PipeTransform {

  transform(value: Item[], term: string): Item[] {

    if (term != null && typeof term !== 'undefined' && term.length > 0) {
      return value.filter(o => o.itemSurname.toLowerCase().includes(term.toLowerCase()));
    } else {
      return value;
    }
  }

}
