import {BudgetItem} from './budget-item';

export interface BudgetState {
    [id: number]: BudgetItem;
}


export const initState: BudgetState = { };
