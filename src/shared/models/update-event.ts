import { BudgetItem } from './budget-item.model';

export interface UpdateEvent {
    old: BudgetItem;
    new: BudgetItem;
}
