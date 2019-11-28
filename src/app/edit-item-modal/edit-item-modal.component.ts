import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BudgetItem } from '../../shared/models/budget-item';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {BUDGET_TYPE} from '../../shared/models/budget-type';

import * as moment from 'moment';
import {BudgetContent} from '../../shared/models/budget-content';
import {UtilsService} from '../services/utils.service';

@Component({
    selector: 'app-edit-item-modal',
    templateUrl: './edit-item-modal.component.html',
    styleUrls: ['./edit-item-modal.component.scss']
})
export class EditItemModalComponent implements OnInit {
    budgetFormEdit: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<EditItemModalComponent>,
        @Inject(MAT_DIALOG_DATA) public item: BudgetItem,
        private fb: FormBuilder,
        private utilsService: UtilsService) { }

    ngOnInit() {
        this.budgetFormEdit = this.fb.group({
            date: [this.item.date, Validators.required]
        });
        this.item.content.forEach((single) => {
            const index = this.item.content.indexOf(single);
            const validator = this.item.type === BUDGET_TYPE.INCOME ? Validators.min(0) : Validators.max(0);
            this.budgetFormEdit.addControl(`amount${index}`, new FormControl(single.amount, [
                Validators.required,
                validator
            ]));
            this.budgetFormEdit.addControl(`description${index}`, new FormControl(single.description, Validators.required));
        });
    }

    submitForm() {
        const {date} = this.budgetFormEdit.value;
        const type = this.item.type;
        const id = this.utilsService.getIdFromDate(date);
        const content: Array<BudgetContent> = Array<BudgetContent>();
        this.item.content.forEach((single) => {
            const index = this.item.content.indexOf(single);
            const amount = this.budgetFormEdit.value[`amount${index}`];
            const description = this.budgetFormEdit.value[`description${index}`];
            const newContent = new BudgetContent(description, amount);
            content.push(newContent);
        });
        const newItem = new BudgetItem(id, type, date, content);
        this.dialogRef.close(newItem);
    }

}
