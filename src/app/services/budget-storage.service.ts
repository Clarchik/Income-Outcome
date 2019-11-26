import {Injectable} from '@angular/core';
import {BudgetItem} from '../../shared/models/budget-item';
import {UpdateEvent} from '../../shared/models/update-event';
import {BudgetService} from './budget.service';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BudgetStorageService {
    // tslint:disable-next-line:variable-name
    private _budgetItems: BudgetItem[] = new Array<BudgetItem>();
    // tslint:disable-next-line:variable-name
    private _totalBudget = 0;
    private $storageData: Subject<StorageData> = new Subject<StorageData>();

    constructor(private budgetService: BudgetService) {
        this.loadLocalData();
        this.budgetService.deleteItem.subscribe(data => this.deleteItem(data));
        this.budgetService.updateItem.subscribe(data => this.updateItem(data));
        this.budgetService.addItem.subscribe(data => this.addItem(data));
    }


    addItem(newItem: BudgetItem) {
        this._budgetItems = [...this._budgetItems, newItem];
        this.saveAndCount();
    }

    deleteItem(item: BudgetItem) {
        const index = this._budgetItems.indexOf(item);
        this._budgetItems.splice(index, 1);
        this.saveAndCount();
    }

    updateItem(item: BudgetItem) {
        const found = this.budgetItems.find((ref) => ref.id === item.id && ref.type === item.type);
        this.budgetItems[this.budgetItems.indexOf(found)] = item;
        this._budgetItems = [...this._budgetItems];
        this.saveAndCount();
    }

    public saveAndCount() {
        const budget = this._budgetItems.map((item) => {
            return item.content.reduce((sum, content) => sum + content.amount, 0);
        });
        this._totalBudget = budget.reduce((sum, item) => sum + item, 0);
        localStorage.setItem('budgetObject', JSON.stringify(this._budgetItems));
        this.$storageData.next({items: this._budgetItems, totalBudget: this._totalBudget});
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

    get budgetItems(): Array<BudgetItem> {
        return this._budgetItems;
    }

    get totalBudget(): number {
        return this._totalBudget;
    }

    get getStorageData(): Subject<StorageData> {
        return this.$storageData;
    }
}

export interface StorageData {
    items: Array<BudgetItem>;
    totalBudget: number;
}
