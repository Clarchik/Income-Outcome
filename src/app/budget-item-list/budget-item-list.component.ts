import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BudgetItem } from '../../shared/models/budget-item';
import {BUDGET_TYPE} from '../../shared/models/budget-type';

@Component({
    selector: 'app-budget-item-list',
    templateUrl: './budget-item-list.component.html',
    styleUrls: ['./budget-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BudgetItemListComponent {

    @Input() budgetItems: BudgetItem[];

    constructor() {}

    get income() {
        return this.budgetItems.filter(item => item.type === BUDGET_TYPE.INCOME);
    }

    get outcome() {
        return this.budgetItems.filter(item => item.type === BUDGET_TYPE.OUTCOME);
    }
}
