import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataService, IDataItem } from "../core/data.service";
import { ActivatedRoute } from "@angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    items: ObservableArray<IDataItem>;

    constructor(private itemService: DataService, private router: RouterExtensions, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    onAdd() {
        let newId = this.items.length + 1;
        this.items.push({id: newId, name: "Item " + newId, description: "Description for Item "+newId, src:"http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png"});
        this.router.navigate(['../item', newId], { relativeTo: this.route});
    }
}
