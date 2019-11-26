import { Component, OnInit } from '@angular/core';
import { BudgetItem } from '../../shared/models/budget-item';
import { UpdateEvent } from '../../shared/models/update-event';
import { BudgetService } from '../services/budget.service';

import {BUDGET_TYPE} from '../../shared/models/budget-type';

import * as moment from 'moment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

    budgetItems: BudgetItem[] = new Array<BudgetItem>();
    totalBudget = 0;

    constructor(private budgetService: BudgetService) { }

    ngOnInit() {
        this.loadLocalData();
        this.budgetService.deleteItem.subscribe(data => this.deleteItem(data));
        // this.budgetService.updateItem.subscribe(data => this.updateItem(data));
        this.budgetService.addItem.subscribe(data => this.addItem(data));
    }


    addItem(newItem: BudgetItem) {
        this.budgetItems = [...this.budgetItems, newItem];
        this.countBudget();
        this.save();
    }

    deleteItem(item: BudgetItem) {
        const index = this.budgetItems.indexOf(item);
        this.budgetItems.splice(index, 1);
        this.countBudget();
        this.save();
    }

    updateItem(updateEvent: UpdateEvent) {
        // this.budgetItems[this.budgetItems.indexOf(updateEvent.old)] = updateEvent.new;
        // this.budgetItems = [...this.budgetItems];
        this.countBudget();
        this.save();
    }

    save() {
        localStorage.setItem('budgetObject', JSON.stringify(this.budgetItems));
    }

    get positiveBudget(): boolean {
        return this.totalBudget > 0;
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
            this.budgetItems = JSON.parse(localItems);
            this.countBudget();
        }
    }

    generatePDF() {
        // const fileName = window.prompt('Print file name');
        // const doc = new jsPDF();
        // const col = ['Date', 'Amout', 'Description'];
        // const rows = [];
        // this.budgetItems.forEach(element => {
        //     const temp = [moment(element.date).format('DD.MM.YYYY'), element.amount, element.description];
        //     rows.push(temp);
        // });
        // doc.autoTable(col, rows);
        // if (fileName.length) {
        //     doc.save(`${fileName}.pdf`);
        // }
    }

    countBudget() {
        const budget = this.budgetItems.map((item) => {
            return item.content.reduce((sum, content) => sum + content.amount, 0);
        });
        this.totalBudget = budget.reduce((sum, item) => sum + item, 0);
    }

}
