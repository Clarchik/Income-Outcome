import { Component, OnInit, Input } from '@angular/core';

import { MatDialog } from '@angular/material';

import { BudgetItem } from '../../shared/models/budget-item.model';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';
import { BudgetService } from '../services/budget.service';

import * as moment from 'moment';

@Component({
    selector: 'app-budget-item-card',
    templateUrl: './budget-item-card.component.html',
    styleUrls: ['./budget-item-card.component.scss'],
})
export class BudgetItemCardComponent implements OnInit {
    @Input() budgetItem: BudgetItem;

    constructor(public dialog: MatDialog, private budgetService: BudgetService) { }

    ngOnInit() {
    }

    deleteButtonClick(item: BudgetItem) {
        this.budgetService.deleteItem.emit(item);
    }

    onItemClick(item: BudgetItem) {
        const dialogRef = this.dialog.open(EditItemModalComponent, {
            width: '580px',
            data: item
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.budgetService.updateItem.emit({
                    old: item,
                    new: result
                });
            }
        });
    }

    getDayByDate(date: Date) {
        return moment(date).format('dddd');
    }

    formatDate(date: Date) {
        return moment(date).format('DD.MM.YYYY');
    }
}
