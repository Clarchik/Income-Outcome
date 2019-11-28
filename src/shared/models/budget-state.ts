import { BudgetItem } from './budget-item';

export interface BudgetState {
    [id: string]: BudgetItem;
}


export const initState: BudgetState = {};
