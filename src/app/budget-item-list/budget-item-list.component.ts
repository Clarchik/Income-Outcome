import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BudgetItem } from '../../shared/models/budget-item.model';

@Component({
    selector: 'app-budget-item-list',
    templateUrl: './budget-item-list.component.html',
    styleUrls: ['./budget-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BudgetItemListComponent {

    @Input() budgetItems: BudgetItem[];

    constructor() {}

}
