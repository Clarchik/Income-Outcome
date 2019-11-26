import { Injectable, EventEmitter } from '@angular/core';
import { BudgetItem } from '../../shared/models/budget-item';
import { UpdateEvent } from '../../shared/models/update-event';

@Injectable({
    providedIn: 'root'
})
export class BudgetService {
    private _deleteItem: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
    private _updateItem: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();
    private _addItem: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
    constructor() { }




    get deleteItem(): EventEmitter<BudgetItem> {
        return this._deleteItem;
    }

    get updateItem(): EventEmitter<UpdateEvent> {
        return this._updateItem;
    }

    get addItem(): EventEmitter<BudgetItem> {
        return this._addItem;
    }
}
