import {BUDGET_TYPE} from './budget-type';
import {BudgetItem} from './budget-item.model';

export class BudgetObject {
    [BUDGET_TYPE.INCOME]: Array<BudgetItem>;
    [BUDGET_TYPE.OUTCOME]: Array<BudgetItem>;
}
