export class BudgetItem {
    constructor(public date: Date, public content: Array<TestItem>) { }
}

export interface TestItem {
    description: string;
    amount: number;
}
