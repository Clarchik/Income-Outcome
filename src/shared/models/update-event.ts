import { BudgetItem } from './budget-item';

export interface UpdateEvent {
    old: BudgetItem;
    new: BudgetItem;
}
