import {Injectable} from '@angular/core';
import {BudgetItem} from '../../shared/models/budget-item';
import {BudgetService} from './budget.service';
import {Subject} from 'rxjs';
import {BudgetState, initState} from '../../shared/models/budget-state';

@Injectable({
    providedIn: 'root'
})
export class BudgetStorageService {
    // tslint:disable-next-line:variable-name
    private _budgetItems: BudgetState = initState;
    // tslint:disable-next-line:variable-name
    private $storageData: Subject<BudgetState> = new Subject<BudgetState>();

    constructor(private budgetService: BudgetService) {
        this.loadLocalData();
        this.budgetService.deleteItem.subscribe(data => this.deleteItem(data));
        this.budgetService.updateItem.subscribe(data => this.updateItem(data));
        this.budgetService.addItem.subscribe(data => this.addItem(data));
    }


    addItem(newItem: BudgetItem) {
        this._budgetItems = { ...this._budgetItems, [newItem.id]: newItem};
        this.saveAndCount();
    }

    deleteItem(item: BudgetItem) {
        const { [item.id]: removed, ...entities } = this._budgetItems;
        this._budgetItems = entities;
        this.saveAndCount();
    }

    updateItem(item: BudgetItem) {
        const entities = { ...this._budgetItems, [item.id] : item};
        this._budgetItems = entities;
        this.saveAndCount();
    }

    public saveAndCount() {
        localStorage.setItem('budgetObject', JSON.stringify(this._budgetItems));
        this.$storageData.next(this._budgetItems);
    }


    clearAllData() {
        const clear = window.prompt('All your data will be cleared forever. If you are sure please print "Delete all"');
        if (clear === 'Delete all') {
            localStorage.removeItem('budgetObject');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    private loadLocalData() {
        const localItems = localStorage.getItem('budgetObject');
        if (localItems) {
            this._budgetItems = JSON.parse(localItems);
            this.saveAndCount();
        }
    }

    get budgetItems(): BudgetState {
        return this._budgetItems;
    }

    get getStorageData(): Subject<BudgetState> {
        return this.$storageData;
    }
}
