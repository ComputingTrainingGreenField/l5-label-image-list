import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    itemList = [
        {x:100, y:100, text:' A '},
        {x:60, y:230, text:' B '},
        {x:280, y:300, text:' C '},
        {x:180, y:430, text:' D '},
    ]

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    onTouch(event) {
        if(event.action == 'down') {
            this.itemList.push({x:event.getX(), y:event.getY(), text: " " + this.itemList.length + " "});
        }
    }
}
