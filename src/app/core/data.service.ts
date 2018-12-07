import { Injectable } from "@angular/core";
import { getJSON, request } from "tns-core-modules/http";
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
    private baseUrl = "http://127.0.0.1:5000/";

    constructor() {
        let dataService = this;
        getJSON(this.baseUrl + "items/").then((r: IDataItem[]) => {
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

    addItem(item: IDataItem) {
        this.items.push(item);
        request({
            url: this.baseUrl + "items/",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(item)
        }).then((response) => {
            const result = response.content.toJSON();
        }, (e) => {
        });
    }

    updateItem(item: IDataItem) {
        this.items[item.id-1] = item;
        request({
            url: this.baseUrl + "items/" + item.id,
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(item)
        }).then((response) => {
            const result = response.content.toJSON();
        }, (e) => {
        });
    }

    deleteItem(item: IDataItem) {
        this.items.splice(item.id - 1);
        request({
            url: this.baseUrl + "items/" + item.id,
            method: "DELETE",
        }).then((response) => {
            const result = response.content.toJSON();
        }, (e) => {
        });
    }
}
