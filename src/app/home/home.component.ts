import { Component, OnInit } from "@angular/core";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout"
import { RouterExtensions } from "nativescript-angular/router";
import { DataService, IDataItem } from "../core/data.service";
import { ActivatedRoute } from "@angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures/gestures";

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
        let newItem = {id: newId, name: "Item " + newId, description: "Description for Item "+newId, src:"~/images/image-placeholder.png"};
        this.itemService.addItem(newItem);
        this.router.navigate(['../item', newId], { relativeTo: this.route});
    }

    onSwipe(event: SwipeGestureEventData) {
        if(event.direction == SwipeDirection.left) {
            let layout = <GridLayout>event.object;
            let item = <IDataItem>layout.bindingContext;
            this.itemService.deleteItem(item);    
        }
    }

    onRefresh() {
        this.itemService.fetchItems();
    }
}
