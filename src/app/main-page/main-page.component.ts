import { Component, OnInit } from '@angular/core';
import { BudgetItem } from '../../shared/models/budget-item';
import { BudgetService } from '../services/budget.service';

import { BUDGET_TYPE } from '../../shared/models/budget-type';

import * as moment from 'moment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BudgetStorageService } from '../services/budget-storage.service';
import { BudgetState } from '../../shared/models/budget-state';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

    budgetItems: BudgetItem[] = new Array<BudgetItem>();
    totalBudget = 0;

    constructor(private bss: BudgetStorageService) { }

    ngOnInit() {
        this.setItemsAndTotalBudget(this.bss.budgetItems);
        this.bss.getStorageData.subscribe((entities: BudgetState) => {
            this.setItemsAndTotalBudget(entities);
        });
    }

    get positiveBudget(): boolean {
        return this.totalBudget > 0;
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

    setItemsAndTotalBudget(entities: BudgetState) {
        const array = Object.keys(entities).map(id => entities[id]);
        const budget = array.map((item) => {
            return item.content.reduce((sum, content) => sum + content.amount, 0);
        });
        this.budgetItems = array;
        this.totalBudget = budget.reduce((sum, item) => sum + item, 0);
    }

}
