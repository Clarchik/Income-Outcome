import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetItem } from '../../shared/models/budget-item.model';

@Component({
    selector: 'app-add-item-form',
    templateUrl: './add-item-form.component.html',
    styleUrls: ['./add-item-form.component.scss']
})
export class AddItemFormComponent implements OnInit {

    @Input() budgetItem: BudgetItem;
    @Output() formSubmit: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();

    isNewItem: boolean;

    constructor() { }

    ngOnInit() {
        if (this.budgetItem) {
            this.isNewItem = false;
        } else {
            this.isNewItem = true;
            this.budgetItem = new BudgetItem('', null, null);

        }
    }

    onSubmit(form: NgForm) {
        this.formSubmit.emit(form.value);
        form.reset();
    }

}
