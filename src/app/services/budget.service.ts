import { Injectable, EventEmitter } from '@angular/core';
import { BudgetItem } from '../../shared/models/budget-item';
import { UpdateBudgetObject } from '../../shared/models/update-budget';

@Injectable({
    providedIn: 'root'
})
export class BudgetService {
    private _deleteItem: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
    private _updateItem: EventEmitter<UpdateBudgetObject> = new EventEmitter<UpdateBudgetObject>();
    private _addItem: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
    constructor() { }




    get deleteItem(): EventEmitter<BudgetItem> {
        return this._deleteItem;
    }

    get updateItem(): EventEmitter<UpdateBudgetObject> {
        return this._updateItem;
    }

    get addItem(): EventEmitter<BudgetItem> {
        return this._addItem;
    }
}
