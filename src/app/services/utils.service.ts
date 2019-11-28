import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { BUDGET_TYPE } from '../../shared/models/budget-type';


@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor() { }

    public generateIdFromDateAndType(date: Date, type: BUDGET_TYPE): string {
        return `${parseInt(moment(date).format('DD.MM.YYYY').replace(/\./g, ''), 10)}-${type.substr(0, 3)}`;
    }
}
