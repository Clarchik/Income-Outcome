import { Component, OnInit } from '@angular/core';
import { BudgetItem } from '../../shared/models/budget-item.model';
import { UpdateEvent } from '../../shared/models/update-event';
import { BudgetService } from '../services/budget.service';


import * as moment from 'moment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {BudgetObject} from '../../shared/models/budget-object';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

    budgetItems: BudgetObject = new BudgetObject();
    totalBudget = 0;

    constructor(private budgetService: BudgetService) { }

    ngOnInit() {
        this.budgetItems.INCOME = [
            {
                date: new Date(),
                content: [
                    {description: 'SSS', amount: +10},
                    {description: 'RRR', amount: +20}
                ]
            }
        ];
        this.budgetItems.OUTCOME = [
            {
                date: new Date(),
                content: [
                    {description: 'DDD', amount: -10},
                    {description: 'TTT', amount: -30}
                ]
            }
        ];
        // const localItems = localStorage.getItem('budgetItems');
        // if (localItems) {
        //     this.budgetItems = JSON.parse(localItems);
        //     const budget = this.budgetItems.reduce((sum, item) => sum + item.content.amount, 0);
        //     this.totalBudget = budget;
        // }
        // this.budgetService.deleteItem.subscribe(data => this.deleteItem(data));
        // this.budgetService.updateItem.subscribe(data => this.updateItem(data));
        // this.budgetService.addItem.subscribe(data => this.addItem(data));
    }

    get income() {
        return this.budgetItems.INCOME;
    }

    get outcome() {
        return this.budgetItems.OUTCOME;
    }

    addItem(newItem: BudgetItem) {
        // this.budgetItems = [...this.budgetItems, newItem];
        // this.totalBudget += newItem.amount;
        // this.save();
    }

    deleteItem(item: BudgetItem) {
        // const index = this.budgetItems.indexOf(item);
        // this.budgetItems.splice(index, 1);
        // this.totalBudget -= item.amount;
        // this.save();
    }

    updateItem(updateEvent: UpdateEvent) {
        // this.budgetItems[this.budgetItems.indexOf(updateEvent.old)] = updateEvent.new;
        // this.budgetItems = [...this.budgetItems];
        // this.totalBudget -= updateEvent.old.amount;
        // this.totalBudget += updateEvent.new.amount;
        // this.save();
    }

    save() {
        localStorage.setItem('budgetItems', JSON.stringify(this.budgetItems));
    }

    get positiveBudget(): boolean {
        return this.totalBudget > 0;
    }

    clearAllData() {
        const clear = window.prompt('All your data will be cleared forever. If you are sure please print "Delete all"');
        if (clear === 'Delete all') {
            localStorage.removeItem('budgetItems');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
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

}
