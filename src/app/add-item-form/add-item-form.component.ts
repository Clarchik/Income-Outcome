import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {BudgetItem} from '../../shared/models/budget-item';
import {BudgetService} from '../services/budget.service';
import {BUDGET_TYPE} from '../../shared/models/budget-type';
import {BudgetContent} from '../../shared/models/budget-content';

import * as moment from 'moment';
import {BudgetStorageService} from '../services/budget-storage.service';

@Component({
    selector: 'app-add-item-form',
    templateUrl: './add-item-form.component.html',
    styleUrls: ['./add-item-form.component.scss']
})
export class AddItemFormComponent implements OnInit {
    budgetForm: FormGroup;


    constructor(private budgetService: BudgetService, private fb: FormBuilder, private bss: BudgetStorageService) {}

    ngOnInit() {
        this.budgetForm = this.fb.group({
            date: [null, Validators.required],
            amount: [null, Validators.required],
            description: [null, Validators.required],
        });
    }

    get incomeType() {
        return BUDGET_TYPE.INCOME;
    }

    get outcomeType() {
        return BUDGET_TYPE.OUTCOME;
    }

    submitForm() {
        const {date, amount, description} = this.budgetForm.value;
        const type = this.isPositiveNumber(amount) ? BUDGET_TYPE.INCOME : BUDGET_TYPE.OUTCOME;
        const id = this.getIdFromDate(date);
        const budgetContent = new BudgetContent(description, amount);
        const budgetItem: BudgetItem = new BudgetItem(id, type, date, [budgetContent]);
        const exist = this.bss.budgetItems.find((item) => item.id === id && item.type === type);
        if (!exist) {
            this.budgetService.addItem.emit(budgetItem);
        } else {
            console.log('exists');
        }
        this.budgetForm.reset();
    }

    private getIdFromDate(date: Date) {
        return parseInt(moment(date).format('DD.MM.YYYY').replace(/\./g, ''), 10);
    }

    private isPositiveNumber(amout: number): boolean {
        if (amout >= 0) {
            return true;
        }
        if (amout < 0) {
            return false;
        }
    }

}
