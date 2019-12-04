import { BUDGET_TYPE } from './budget-type';
import { BudgetContent } from './budget-content';

export class BudgetItem {
    constructor(
        public id: string,
        public type: BUDGET_TYPE,
        public date: Date,
        public content: Array<BudgetContent>,
        public expanded: boolean = true) { }
}
