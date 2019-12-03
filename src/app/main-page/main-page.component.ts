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
        const fileName = window.prompt('Print file name');
        const doc = new jsPDF();
        const col = ['Date', 'Description', 'Amount'];
        const rows = [];
        const items = this.budgetItems.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
        items.forEach(element => {
            element.type === BUDGET_TYPE.INCOME ? doc.setFillColor('green') : doc.setFillColor('red');
            const tempAmount = [];
            const tempDescription = [];
            element.content.forEach(item => {
                tempAmount.push(item.amount);
                tempDescription.push(item.description);
            });
            const temp = [
                moment(element.date).format('DD.MM.YYYY'),
                tempDescription.join('\r'),
                tempAmount.join('\r'),
                element.type];
            rows.push(temp);
        });
        doc.autoTable(col, rows, {
            didParseCell: function(data) {
                if (data.section !== 'head') {
                    if (data.row.raw[3] === BUDGET_TYPE.INCOME) {
                        data.cell.styles.fillColor = [0, 204, 134];
                    } else {
                        data.cell.styles.fillColor = [220, 57, 0];
                    }
                    data.cell.styles.textColor = [255, 255, 255];
                }
            },
        });
        if (fileName.length) {
            doc.save(`${fileName}.pdf`);
        }
    }

    setItemsAndTotalBudget(entities: BudgetState) {
        const array = Object.keys(entities).map(id => entities[id]);
        const budget = array.map((item) => {
            return item.content.reduce((sum, content) => sum + content.amount, 0);
        });
        this.budgetItems = array;
        this.totalBudget = budget.reduce((sum, item) => sum + item, 0);
    }

    clearAllData() {
        const confirm = window.prompt('All data will be lost forever. If you are sure, print <Delete All>');
        if (confirm === 'Delete All') {
            localStorage.removeItem('budgetObject');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

}
