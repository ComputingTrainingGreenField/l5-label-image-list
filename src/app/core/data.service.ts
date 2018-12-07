import { Injectable } from "@angular/core";
import { getJSON } from "tns-core-modules/http";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

export interface IDataItem {
    id: number;
    name: string;
    description: string;
    src: string;
}

@Injectable()
export class DataService {

    private items = new ObservableArray<IDataItem>();

    constructor() {
        let dataService = this;
        getJSON("http://127.0.0.1:5000/items").then((r: IDataItem[]) => {
            dataService.items.push(r);
        }, (e) => {
        });
    }

    getItems(): ObservableArray<IDataItem> {
        return this.items;
    }

    getItem(id: number): IDataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
