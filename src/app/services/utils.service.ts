import {Injectable} from '@angular/core';

import * as moment from 'moment';


@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor() {}

    public getIdFromDate(date: Date) {
        return parseInt(moment(date).format('DD.MM.YYYY').replace(/\./g, ''), 10);
    }
}
