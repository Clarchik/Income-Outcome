import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BudgetItem } from '../../shared/models/budget-item.model';
import {BUDGET_TYPE} from '../../shared/models/budget-type';

@Component({
    selector: 'app-budget-item-list',
    templateUrl: './budget-item-list.component.html',
    styleUrls: ['./budget-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BudgetItemListComponent {

    @Input() budgeOutcometItems: BudgetItem[];
    @Input() budgetIncomeItems: BudgetItem[];

    constructor() {}

    get budgetType() {
        return BUDGET_TYPE;
    }

}
