import { Component, OnInit } from "@angular/core";
import { TouchGestureEventData } from "tns-core-modules/ui/gestures/gestures";

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

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    onTouch(event:TouchGestureEventData): void {
        if(event.action == 'up') {
            this.count++;
            this.text_x = event.getX();
            this.text_y = event.getY();    
        }
    }
}
