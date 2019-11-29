import {Pipe, PipeTransform} from '@angular/core';
import {BudgetItem} from 'src/shared/models/budget-item';

@Pipe({
    name: 'sortByDate',
    pure: false
})
export class SortByDatePipe implements PipeTransform {
    transform(value: Array<BudgetItem>): any {
        if (value) {
            return value.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
    }

}
