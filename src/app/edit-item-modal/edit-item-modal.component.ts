import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BudgetItem} from '../../shared/models/budget-item';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {BUDGET_TYPE} from '../../shared/models/budget-type';

import {BudgetContent} from '../../shared/models/budget-content';
import {UtilsService} from '../services/utils.service';

@Component({
    selector: 'app-edit-item-modal',
    templateUrl: './edit-item-modal.component.html',
    styleUrls: ['./edit-item-modal.component.scss']
})
export class EditItemModalComponent implements OnInit {
    public budgetFormEdit: FormGroup;
    private _budgetItem: BudgetItem;
    constructor(
        public dialogRef: MatDialogRef<EditItemModalComponent>,
        @Inject(MAT_DIALOG_DATA) public item: BudgetItem,
        private fb: FormBuilder,
        private utilsService: UtilsService) { }

    ngOnInit() {
        this.budgetFormEdit = this.fb.group({
            date: [this.item.date, Validators.required],
            content: new FormArray([])
        });
        this.initContentControls();
    }

    public submitForm() {
        const {date} = this.budgetFormEdit.value;
        const type = this.item.type;
        const id = this.utilsService.generateIdFromDateAndType(date, type);
        const contentArray: Array<BudgetContent> = Array<BudgetContent>();
        this.formContent.controls.forEach((single) => {
            const {amount, description} = single.value;
            const content = new BudgetContent(description, amount);
            contentArray.push(content);
        });
        const newItem = new BudgetItem(id, type, date, contentArray);
        this.dialogRef.close(newItem);
    }

    public addRow() {
        this.addContentRowToForm();
    }

    public deleteRow(index) {
        this.formContent.removeAt(index);
    }

    private initContentControls() {
        this.budgetItem.content.forEach((single) => {
            this.addContentRowToForm(single);
        });
    }

    private addContentRowToForm(item: BudgetContent = null) {
        const validator = this.item.type === BUDGET_TYPE.INCOME ? Validators.min(0) : Validators.max(0);
        this.formContent.push(this.fb.group({
            amount: [item ? item.amount : null, [Validators.required, validator]],
            description: [item ? item.description : null, [Validators.required]]
        }));
    }

    get lowContent(): boolean {
        return this.formContent.controls.length <= 1;
    }

    get budgetItem(): BudgetItem {
        return this.item;
    }

    get formContent(): FormArray {
        return this.budgetFormEdit.controls.content as FormArray;
    }
}
