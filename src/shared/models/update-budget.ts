import {BudgetItem} from './budget-item';

export interface UpdateBudgetObject {
    old: BudgetItem;
    new?: BudgetItem;
}
