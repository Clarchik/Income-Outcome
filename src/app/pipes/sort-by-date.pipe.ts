import { Pipe, PipeTransform } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item.model';

@Pipe({
    name: 'sortByDate',
    // pure: false
})
export class SortByDatePipe implements PipeTransform {
    transform(value: Array<BudgetItem>): any {
        return value.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

}
