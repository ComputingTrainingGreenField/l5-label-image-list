import { Component, OnInit } from "@angular/core";
import { TouchGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { EventData, View } from "tns-core-modules/ui/page/page";
import { TabViewItem } from "ui/tab-view"

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    icon_x = 50;
    icon_y = 50;
    text_x = 100;
    text_y = 100;
    label_x = 50;
    label_y = 200;
    count = 0; 
    timer = null;
    view_width = 300;
    view_height = 500;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
        this.timer = setInterval(() => {
            this.text_x = Math.floor(Math.random() * this.view_width);
            this.text_y = Math.floor(Math.random() * this.view_height);
        }, 1000);
    }

    onTouch(event:TouchGestureEventData): void {
        if(event.action == 'up') {
            this.count++;
            this.text_x = event.getX();
            this.text_y = event.getY();    
        }
    }
}
