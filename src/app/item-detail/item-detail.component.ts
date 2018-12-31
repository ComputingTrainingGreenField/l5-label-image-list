import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService, IDataItem } from "../core/data.service";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { takePicture, requestPermissions } from "nativescript-camera";
import * as fs from "file-system";
import { ImageSource } from "tns-core-modules/image-source";
import * as imagepicker from "nativescript-imagepicker";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";

@Component({
    selector: "ItemDetail",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html"
})
export class ItemDetailComponent implements OnInit {
    item: IDataItem;

    constructor(
        private data: DataService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.item = this.data.getItem(id);
    }

    onTap() {
        let itemDetail = this;
        dialogs.action({
            message: "Choose image for the new item",
            cancelButtonText: "Cancel",
            actions: ["Photo", "Camera"]
        }).then(result => {
            console.log("Dialog result: " + result);
            if(result == "Photo"){
                this.onPickImage();
            } else if(result == "Camera") {
                this.onTakePhoto();
            }
        });
    }

    onRequestPermissions() {
        requestPermissions();
    }

    onPickImage() {
        let itemDetail = this;
        let context = imagepicker.create({ mode: "single" });
        context
            .authorize()
            .then(function() {
                return context.present();
            })
            .then(function(selection) {
                itemDetail.setImage(selection[0]);
            }).catch(function (e) {
                // process error
                console.log(e);
            });
    }

    onTakePhoto() {
        let itemDetail = this;        
        takePicture({
            width: 300,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: true
        }).then(imageAsset => {
            itemDetail.setImage(imageAsset);
        });
    }

    setImage(imageAsset: ImageAsset) {
        let itemDetail = this;
        const source = new ImageSource();
        source.fromAsset(imageAsset).then(imageSource => {
            const folderPath: string = fs.knownFolders.documents().path;
            const fileName = "item_" + new Date().getTime() + ".jpg";
            const filePath = fs.path.join(folderPath, fileName);
            const saved: boolean = imageSource.saveToFile(filePath, "jpg");
            if (saved) {
                itemDetail.item.src = filePath;
                itemDetail.data.uploadFile(itemDetail.item, fileName, filePath);
            }    
        });
    }
    
    onItemNameChange(newValue) {
        this.data.updateItem({id:this.item.id, name:newValue, description:this.item.description, src:this.item.src});
    }

    onItemDescriptionChange(newValue) {
        this.data.updateItem({id:this.item.id, name:this.item.name, description:newValue, src:this.item.src});
    }
}
