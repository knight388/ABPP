import { Inject, Component, OnInit, ElementRef,
        OnDestroy, ViewChild, ChangeDetectorRef, 
        ViewContainerRef, AfterViewInit, Renderer } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { DynamicComponent } from "./../../shared/components/dynamic.component";
import { FormService } from "../../shared/models/form/form.service";
import { ElementFactory, AbstractElement } from "../../shared/factory/element";

import * as app from "application";

import { Label } from "ui/label";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { CheckBox } from "nativescript-checkbox";
import { ProxyViewContainer } from "ui/proxy-view-container"
import { StackLayout } from "ui/layouts/stack-layout";
import dialogs = require("ui/dialogs");
import { Image } from "ui/image";
import { DropDown } from "nativescript-drop-down"; 
import * as camera from "nativescript-camera";
import * as imageSource from "image-source";
import { Sqlite } from "../../shared/data/providers/sqlite";

var imagepicker = require("nativescript-imagepicker");

import { Config } from "../../shared/config";

@Component({
  selector: "form",
  templateUrl: "pages/form/form.html",
  styleUrls: ["pages/form/form-common.css", "pages/form/form.css"],
  providers: [FormService]
})

export class FormComponent implements OnInit, OnDestroy {
  id : number;
  private sub : any;
  private formLoading : boolean = false;
  private page: Object = null; //Lokaal form renderen
  private formPayload = []; //Array Object dat uiteindelijk 'verwerkt' wordt.
  private db: Sqlite;
  @ViewChild("container",{ read: ViewContainerRef }) container : ViewContainerRef;
  @ViewChild("form") formElement : ElementRef;

    constructor(
      private route: ActivatedRoute,
      private _changeDetectionRef: ChangeDetectorRef,
      private dom: Page,
      @Inject("DynamicComponent") private _dynamicComponent: DynamicComponent,
      private formService : FormService
    ) {}

    ngOnInit(){
      this._changeDetectionRef.detectChanges();

      this.sub = this.route.params.subscribe(params => {
        this.id = +params['page_id'];
        console.log('this.id  =' + this.id);

        if(isNaN(this.id) || this.id === 99){
          this.id=99;
          this.createDemoPage();
        } else {
          this.createPage();
        }

      });
    }

    ngOnDestroy(){
      this.sub.unsubscribe();
    }

    createPage(){
      if(Config.isNetworkAvailable)
        this.formService.loadPage(this.id).subscribe((data)=>{
          this.clearPage();
          this.page = data;
          this.db.setSetting('page_'+this.id,data);
          this.renderPage();
          
        });
      else {
          let data = this.db.getSetting('page_'+this.id);
          this.clearPage();
          this.page = data;
          this.renderPage();
      }
    }

    createDemoPage(){
      this.clearPage();
      this.page = {
        'Id': 99,
        'Title': 'Startpagina',
        'Rows':[{
          'Id': 1,
          'Visible':true,
          'Title':'Welkom',
          'Elements':[{
            'Label':'Welkom',
            'Type':'header'
          },
          {
            'Label':'Welkom 2',
            'Type':'header'
          }] 
        }]
      };
      this.renderPage();
    }

    renderPage(){
      this.page['Rows'].forEach((row)=>{
        console.log("this.page.Elements.size=" + row.Elements.length);
        row.Elements.forEach((element)=>{
          let elementObject : AbstractElement;
          console.log("Label");

          if(element.Type == 'checkbox')
              return;
            if(element.Label == 'Foto')
              element.Type = 'img_gallery';

          elementObject = ElementFactory.createElement(element.Type, element);


          if(elementObject!==null){
            //Add label
            if(typeof elementObject.label!=='undefined'
              && elementObject.label.length > 0){
                
              let labelObject = ElementFactory.createElement(
                'label',
                {
                  value: elementObject.label,
                  class: 'label'
                });
                this._dynamicComponent.addComponent(
                  this.container, labelObject.render()
                );
            }
            console.log("Label1");

            //Main Element

            let _component = <any>

            this._dynamicComponent.addComponent(
              this.container, elementObject.render()
            );
            console.log("addComponent element");

            if(element.Type == 'dropdown') 
                this.initializeDropDown(element);
            else if(element.Type == 'radio')
                this.initializeRadio(element);


            console.log("Label2");
            //Add Helper
            if(typeof elementObject.helper!=='undefined'
              && elementObject.helper.length > 0){
              let labelObject = ElementFactory.createElement(
                'label',
                {
                  value: elementObject.helper,
                  class: 'helper'
                });
                this._dynamicComponent.addComponent(
                  this.container, labelObject.render()
                );
            }
            console.log("Label3");
            //Bind events
            if(elementObject.hasEvent==true){
              //Handle form submission
              if(element.Type == 'submit'){
                _component.prototype.onTap = () => {
                  this.submit();
                }
              } 
              //Handle camera/photo click
              if(element.Type=='camera') {
                _component.prototype.onTap = () => {
                  this.takePictureFromCamera();  
                }
              }
              if(element.Type== 'img_gallery') {
                _component.prototype.onTap = () => {
                  this.showImagePicker();
                }
              }
            }
          }
        });

      });
      this.formLoading=false;
      this._changeDetectionRef.detectChanges();
    }

    clearPage(){
      this.container.clear();
      this.formLoading=false;
      this._changeDetectionRef.detectChanges();
    }

    getCameraImageElement(){
      let el: StackLayout = this.formElement.nativeElement;
      for(let i=2;i<el.getChildrenCount();i++){
        let child = <ProxyViewContainer>el.getChildAt(i);
          for(let x=0;x<child.getChildrenCount();x++){
            let element = <Image>child.getChildAt(x);
            if(element.className == 'img_camera')
              return element;
        }
      }
    }

    getDropDownElement(){
      let el: StackLayout = this.formElement.nativeElement;
      for(let i=2;i<el.getChildrenCount();i++){
        let child = <ProxyViewContainer>el.getChildAt(i);
          for(let x=0;x<child.getChildrenCount();x++){
            let element = <DropDown>child.getChildAt(x);
            if(element.className =='dropdown')
              return element;
          }
      }
    }
    
    getImagePickerImgElement(){ 
      let el: StackLayout = this.formElement.nativeElement;
        for(let i=2;i<el.getChildrenCount();i++){
          let child = <ProxyViewContainer>el.getChildAt(i);
            for(let x=0;x<child.getChildrenCount();x++){
              let element = <Image>child.getChildAt(x);
              if(element.className =='img_gallery')
                return element;
            }
        }
    }

    getRadioElement(){
      let el: StackLayout = this.formElement.nativeElement;
      for(let i=2;i<el.getChildrenCount();i++){
        let child = <ProxyViewContainer>el.getChildAt(i);
          for(let x=0;x<child.getChildrenCount();x++){
            let element = <DropDown>child.getChildAt(x);
            if(element.className =='radio')
              return element;
          }
      }
    }

    takePictureFromCamera(){
      camera.requestPermissions();
      let isCameraAvailable = camera.isAvailable();
      let strCamera:string = "Camera is not available";
      if(isCameraAvailable == false) {
        //dialog.alert(strCamera);
        //return;
      }
      camera.takePicture()
        .then((imageAsset) => {
          console.log("Result is an image asset instance");
          let image = new Image();
          image.src = imageAsset;
          imageSource.fromAsset(imageAsset)
          .then((res)=>{
              console.log('width =' + res.width);
              let cameraImgElement:Image = <Image>this.getCameraImageElement();
              cameraImgElement.src = res;
              let myImageSource:imageSource.ImageSource = new imageSource.ImageSource();
              myImageSource = <imageSource.ImageSource>cameraImgElement.src;
              console.log('base64 string = ' + myImageSource.toBase64String("png"));
          },(error)=>{ 
            console.log("error loading image:" +error);
          });

        }).catch((err) => {
          console.log("Error -> " + err.message);
      });
     }

    showImagePicker(){
      let context = imagepicker.create({
        mode:"single"
      });
      context
        .authorize()
        .then(function() {
            return context.present();
        })
        .then((selection) =>{
            console.log("Selection done:");
            selection.forEach((selected) =>{
                console.log(" - " + selected.uri);
                let pickerImgElement:Image = <Image>this.getImagePickerImgElement();
                if (app.android) {
                  let REQUIRED_SIZE = {
                    maxWidth: 800,
                    maxHeight: 800
                  };
                  let selectedImgSource = selected.decodeUri(selected._uri, REQUIRED_SIZE);
                  pickerImgElement.src = selectedImgSource;
                }
                else {
                selected.getImage().then((imgSource) => {     
                   console.log('dddfd');
                   pickerImgElement.src = imgSource;
                });
                }
            });
        }).catch(function (e) {
            console.log(e);
      });
    }

    initializeRadio(radioString){
      let data = [];
      let selectedIndex:number = 0;
      let options = JSON.parse(radioString['Options']);
      options.forEach((row) => {
        data.push(row['Title']);
        if(row['Selected'] == true) 
          selectedIndex = data.length - 1;
      });
      let radioElement:DropDown = <DropDown> this.getRadioElement();
      radioElement.selectedIndex = selectedIndex;
      radioElement.items = data;
    }


    initializeDropDown(dropDownString){
      let data = [];
      let selectedIndex:number = 0;
      let options = JSON.parse(dropDownString['Options']);
      options.forEach((row) => {
        data.push(row['Title']);
        if(row['Selected'] == true) 
          selectedIndex = data.length - 1;
      });
      let dropDownElement:DropDown = <DropDown> this.getDropDownElement();
      dropDownElement.selectedIndex = selectedIndex;
      dropDownElement.items = data;
    }

    submit(){
      this.formPayload = [];
      this.formPayload.push({
        ElementID:this.id
      });
      let elements = [];
      let el: StackLayout = this.formElement.nativeElement;

      console.log('Children Count:' + el.getChildrenCount());
      for(let i=2;i<el.getChildrenCount();i++){

        //index starts at 2 -> 0-activityindicator,1-stacklayout
        let child = <ProxyViewContainer>el.getChildAt(i);
        
        console.log('Proxy Child Count:' + child.getChildrenCount());

        for(let x=0;x<child.getChildrenCount();x++){
          
          let imgElement = <Image> child.getChildAt(x);

          if(imgElement.className == 'img_camera' || imgElement.className == 'img_gallery' ){

            console.log('imgElement');

            let myImageSource:imageSource.ImageSource = new imageSource.ImageSource();
            myImageSource = <imageSource.ImageSource>imgElement.src;

            console.log('base64 string = ' + myImageSource.toBase64String("png"));
          
            if(myImageSource!=undefined)
              elements.push({
                'id':imgElement.id,
                'value':myImageSource.toBase64String("png")
              });
          }

          let dropDownElement = <DropDown>child.getChildAt(x);
          if(dropDownElement.className == 'dropdown' ||
                  dropDownElement.className == 'radio'){
              if(dropDownElement.items.length>0){
                console.log('dropDown Item =' + dropDownElement.items[dropDownElement.selectedIndex]);
                elements.push({
                  'id':dropDownElement.id,
                  'value':dropDownElement.items[dropDownElement.selectedIndex]
                });
              }
          }

          let value = <TextField>child.getChildAt(x);
          //console.log('value.text = ' + value.text);
          //console.log('value.id = ' + value.id);
          if(value.text && value.id){
            elements.push({
              'id':value.id,
              'value':value.text
            });
          } 
        }
      }

      let myJson = {
        'DataString':elements
      };
      this.formPayload.push(myJson);
      this.formPayload.push({'GUID':Config.authToken});

      let formPayloadJson:string = JSON.stringify(this.formPayload);

      let json:string = JSON.stringify({
        ElementID:this.id,
        DataString: '{"id":10,"value":"Aaa"}',
        //it is commented since it is not handled on backend
        //DataString: elements,  
        GUID:Config.authToken
      });

      console.log('formPayload = ' + formPayloadJson);


      this.formService.submitForm(this.id, json).subscribe((data)=>{
          console.log(data);
      });

      
      //console.dump(this.formPayload);

      let strDialog = JSON.stringify({
                formPayload: this.formPayload});

      //dialogs.alert(strDialog).then(()=> {
            
        //});
    }    
}