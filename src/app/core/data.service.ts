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
    private baseUrl = "http://139.180.200.49:5000/";

    constructor() {
        this.fetchItems();
    }

    getItems(): ObservableArray<IDataItem> {
        return this.items;
    }

    getItem(id: number): IDataItem {
        return this.items.filter((item) => item.id === id)[0];
    }

    fetchItems() {
        let dataService = this;
        dataService.items.splice(0);
        getJSON(this.baseUrl + "items/").then((r: IDataItem[]) => {
            dataService.items.push(r);
        }, (e) => {
        });
    }

    addItem(item: IDataItem) {
        this.items.push(item);
        request({
            url: this.baseUrl + "items/",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(item)
        }).then((response) => {
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
        }, (e) => {
        });
    }

    deleteItem(item: IDataItem) {
        for(let i=0;i<this.items.length-1;i++) {
            if(this.items[i].id == item.id) {
                this.items.splice(i, 1);
                break;
            }
        }
        request({
            url: this.baseUrl + "items/" + item.id,
            method: "DELETE",
        }).then((response) => {
        }, (e) => {
        });
    }
}
