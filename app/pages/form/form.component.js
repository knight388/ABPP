"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dynamic_component_1 = require("./../../shared/components/dynamic.component");
var form_service_1 = require("../../shared/models/form/form.service");
var element_1 = require("../../shared/factory/element");
var app = require("application");
var page_1 = require("ui/page");
var image_1 = require("ui/image");
var camera = require("nativescript-camera");
var imageSource = require("image-source");
var imagepicker = require("nativescript-imagepicker");
var config_1 = require("../../shared/config");
var FormComponent = (function () {
    function FormComponent(route, _changeDetectionRef, dom, _dynamicComponent, formService) {
        this.route = route;
        this._changeDetectionRef = _changeDetectionRef;
        this.dom = dom;
        this._dynamicComponent = _dynamicComponent;
        this.formService = formService;
        this.formLoading = false;
        this.page = null; //Lokaal form renderen
        this.formPayload = []; //Array Object dat uiteindelijk 'verwerkt' wordt.
    }
    FormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._changeDetectionRef.detectChanges();
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['page_id'];
            console.log('this.id  =' + _this.id);
            if (isNaN(_this.id) || _this.id === 99) {
                _this.id = 99;
                _this.createDemoPage();
            }
            else {
                _this.createPage();
            }
        });
    };
    FormComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    FormComponent.prototype.createPage = function () {
        var _this = this;
        if (config_1.Config.isNetworkAvailable)
            this.formService.loadPage(this.id).subscribe(function (data) {
                _this.clearPage();
                _this.page = data;
                _this.db.setSetting('page_' + _this.id, data);
                _this.renderPage();
            });
        else {
            var data = this.db.getSetting('page_' + this.id);
            this.clearPage();
            this.page = data;
            this.renderPage();
        }
    };
    FormComponent.prototype.createDemoPage = function () {
        this.clearPage();
        this.page = {
            'Id': 99,
            'Title': 'Startpagina',
            'Rows': [{
                    'Id': 1,
                    'Visible': true,
                    'Title': 'Welkom',
                    'Elements': [{
                            'Label': 'Welkom',
                            'Type': 'header'
                        },
                        {
                            'Label': 'Welkom 2',
                            'Type': 'header'
                        }]
                }]
        };
        this.renderPage();
    };
    FormComponent.prototype.renderPage = function () {
        var _this = this;
        this.page['Rows'].forEach(function (row) {
            console.log("this.page.Elements.size=" + row.Elements.length);
            row.Elements.forEach(function (element) {
                var elementObject;
                console.log("Label");
                if (element.Type == 'checkbox')
                    return;
                if (element.Label == 'Foto')
                    element.Type = 'img_gallery';
                elementObject = element_1.ElementFactory.createElement(element.Type, element);
                if (elementObject !== null) {
                    //Add label
                    if (typeof elementObject.label !== 'undefined'
                        && elementObject.label.length > 0) {
                        var labelObject = element_1.ElementFactory.createElement('label', {
                            value: elementObject.label,
                            class: 'label'
                        });
                        _this._dynamicComponent.addComponent(_this.container, labelObject.render());
                    }
                    console.log("Label1");
                    //Main Element
                    var _component = _this._dynamicComponent.addComponent(_this.container, elementObject.render());
                    console.log("addComponent element");
                    if (element.Type == 'dropdown')
                        _this.initializeDropDown(element);
                    else if (element.Type == 'radio')
                        _this.initializeRadio(element);
                    console.log("Label2");
                    //Add Helper
                    if (typeof elementObject.helper !== 'undefined'
                        && elementObject.helper.length > 0) {
                        var labelObject = element_1.ElementFactory.createElement('label', {
                            value: elementObject.helper,
                            class: 'helper'
                        });
                        _this._dynamicComponent.addComponent(_this.container, labelObject.render());
                    }
                    console.log("Label3");
                    //Bind events
                    if (elementObject.hasEvent == true) {
                        //Handle form submission
                        if (element.Type == 'submit') {
                            _component.prototype.onTap = function () {
                                _this.submit();
                            };
                        }
                        //Handle camera/photo click
                        if (element.Type == 'camera') {
                            _component.prototype.onTap = function () {
                                _this.takePictureFromCamera();
                            };
                        }
                        if (element.Type == 'img_gallery') {
                            _component.prototype.onTap = function () {
                                _this.showImagePicker();
                            };
                        }
                    }
                }
            });
        });
        this.formLoading = false;
        this._changeDetectionRef.detectChanges();
    };
    FormComponent.prototype.clearPage = function () {
        this.container.clear();
        this.formLoading = false;
        this._changeDetectionRef.detectChanges();
    };
    FormComponent.prototype.getCameraImageElement = function () {
        var el = this.formElement.nativeElement;
        for (var i = 2; i < el.getChildrenCount(); i++) {
            var child = el.getChildAt(i);
            for (var x = 0; x < child.getChildrenCount(); x++) {
                var element = child.getChildAt(x);
                if (element.className == 'img_camera')
                    return element;
            }
        }
    };
    FormComponent.prototype.getDropDownElement = function () {
        var el = this.formElement.nativeElement;
        for (var i = 2; i < el.getChildrenCount(); i++) {
            var child = el.getChildAt(i);
            for (var x = 0; x < child.getChildrenCount(); x++) {
                var element = child.getChildAt(x);
                if (element.className == 'dropdown')
                    return element;
            }
        }
    };
    FormComponent.prototype.getImagePickerImgElement = function () {
        var el = this.formElement.nativeElement;
        for (var i = 2; i < el.getChildrenCount(); i++) {
            var child = el.getChildAt(i);
            for (var x = 0; x < child.getChildrenCount(); x++) {
                var element = child.getChildAt(x);
                if (element.className == 'img_gallery')
                    return element;
            }
        }
    };
    FormComponent.prototype.getRadioElement = function () {
        var el = this.formElement.nativeElement;
        for (var i = 2; i < el.getChildrenCount(); i++) {
            var child = el.getChildAt(i);
            for (var x = 0; x < child.getChildrenCount(); x++) {
                var element = child.getChildAt(x);
                if (element.className == 'radio')
                    return element;
            }
        }
    };
    FormComponent.prototype.takePictureFromCamera = function () {
        var _this = this;
        camera.requestPermissions();
        var isCameraAvailable = camera.isAvailable();
        var strCamera = "Camera is not available";
        if (isCameraAvailable == false) {
            //dialog.alert(strCamera);
            //return;
        }
        camera.takePicture()
            .then(function (imageAsset) {
            console.log("Result is an image asset instance");
            var image = new image_1.Image();
            image.src = imageAsset;
            imageSource.fromAsset(imageAsset)
                .then(function (res) {
                console.log('width =' + res.width);
                var cameraImgElement = _this.getCameraImageElement();
                cameraImgElement.src = res;
                var myImageSource = new imageSource.ImageSource();
                myImageSource = cameraImgElement.src;
                console.log('base64 string = ' + myImageSource.toBase64String("png"));
            }, function (error) {
                console.log("error loading image:" + error);
            });
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
    };
    FormComponent.prototype.showImagePicker = function () {
        var _this = this;
        var context = imagepicker.create({
            mode: "single"
        });
        context
            .authorize()
            .then(function () {
            return context.present();
        })
            .then(function (selection) {
            console.log("Selection done:");
            selection.forEach(function (selected) {
                console.log(" - " + selected.uri);
                var pickerImgElement = _this.getImagePickerImgElement();
                if (app.android) {
                    var REQUIRED_SIZE = {
                        maxWidth: 800,
                        maxHeight: 800
                    };
                    var selectedImgSource = selected.decodeUri(selected._uri, REQUIRED_SIZE);
                    pickerImgElement.src = selectedImgSource;
                }
                else {
                    selected.getImage().then(function (imgSource) {
                        console.log('dddfd');
                        pickerImgElement.src = imgSource;
                    });
                }
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    FormComponent.prototype.initializeRadio = function (radioString) {
        var data = [];
        var selectedIndex = 0;
        var options = JSON.parse(radioString['Options']);
        options.forEach(function (row) {
            data.push(row['Title']);
            if (row['Selected'] == true)
                selectedIndex = data.length - 1;
        });
        var radioElement = this.getRadioElement();
        radioElement.selectedIndex = selectedIndex;
        radioElement.items = data;
    };
    FormComponent.prototype.initializeDropDown = function (dropDownString) {
        var data = [];
        var selectedIndex = 0;
        var options = JSON.parse(dropDownString['Options']);
        options.forEach(function (row) {
            data.push(row['Title']);
            if (row['Selected'] == true)
                selectedIndex = data.length - 1;
        });
        var dropDownElement = this.getDropDownElement();
        dropDownElement.selectedIndex = selectedIndex;
        dropDownElement.items = data;
    };
    FormComponent.prototype.submit = function () {
        this.formPayload = [];
        this.formPayload.push({
            ElementID: this.id
        });
        var elements = [];
        var el = this.formElement.nativeElement;
        console.log('Children Count:' + el.getChildrenCount());
        for (var i = 2; i < el.getChildrenCount(); i++) {
            //index starts at 2 -> 0-activityindicator,1-stacklayout
            var child = el.getChildAt(i);
            console.log('Proxy Child Count:' + child.getChildrenCount());
            for (var x = 0; x < child.getChildrenCount(); x++) {
                var imgElement = child.getChildAt(x);
                if (imgElement.className == 'img_camera' || imgElement.className == 'img_gallery') {
                    console.log('imgElement');
                    var myImageSource = new imageSource.ImageSource();
                    myImageSource = imgElement.src;
                    console.log('base64 string = ' + myImageSource.toBase64String("png"));
                    if (myImageSource != undefined)
                        elements.push({
                            'id': imgElement.id,
                            'value': myImageSource.toBase64String("png")
                        });
                }
                var dropDownElement = child.getChildAt(x);
                if (dropDownElement.className == 'dropdown' ||
                    dropDownElement.className == 'radio') {
                    if (dropDownElement.items.length > 0) {
                        console.log('dropDown Item =' + dropDownElement.items[dropDownElement.selectedIndex]);
                        elements.push({
                            'id': dropDownElement.id,
                            'value': dropDownElement.items[dropDownElement.selectedIndex]
                        });
                    }
                }
                var value = child.getChildAt(x);
                //console.log('value.text = ' + value.text);
                //console.log('value.id = ' + value.id);
                if (value.text && value.id) {
                    elements.push({
                        'id': value.id,
                        'value': value.text
                    });
                }
            }
        }
        var myJson = {
            'DataString': elements
        };
        this.formPayload.push(myJson);
        this.formPayload.push({ 'GUID': config_1.Config.authToken });
        var formPayloadJson = JSON.stringify(this.formPayload);
        var json = JSON.stringify({
            ElementID: this.id,
            DataString: '{"id":10,"value":"Aaa"}',
            //it is commented since it is not handled on backend
            //DataString: elements,  
            GUID: config_1.Config.authToken
        });
        console.log('formPayload = ' + formPayloadJson);
        this.formService.submitForm(this.id, json).subscribe(function (data) {
            console.log(data);
        });
        //console.dump(this.formPayload);
        var strDialog = JSON.stringify({
            formPayload: this.formPayload
        });
        //dialogs.alert(strDialog).then(()=> {
        //});
    };
    return FormComponent;
}());
__decorate([
    core_1.ViewChild("container", { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], FormComponent.prototype, "container", void 0);
__decorate([
    core_1.ViewChild("form"),
    __metadata("design:type", core_1.ElementRef)
], FormComponent.prototype, "formElement", void 0);
FormComponent = __decorate([
    core_1.Component({
        selector: "form",
        templateUrl: "pages/form/form.html",
        styleUrls: ["pages/form/form-common.css", "pages/form/form.css"],
        providers: [form_service_1.FormService]
    }),
    __param(3, core_1.Inject("DynamicComponent")),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        core_1.ChangeDetectorRef,
        page_1.Page,
        dynamic_component_1.DynamicComponent,
        form_service_1.FormService])
], FormComponent);
exports.FormComponent = FormComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUV5RTtBQUN6RSwwQ0FBaUQ7QUFFakQsaUZBQStFO0FBQy9FLHNFQUFvRTtBQUNwRSx3REFBK0U7QUFFL0UsaUNBQW1DO0FBR25DLGdDQUErQjtBQU0vQixrQ0FBaUM7QUFFakMsNENBQThDO0FBQzlDLDBDQUE0QztBQUc1QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUV0RCw4Q0FBNkM7QUFTN0MsSUFBYSxhQUFhO0lBVXRCLHVCQUNVLEtBQXFCLEVBQ3JCLG1CQUFzQyxFQUN0QyxHQUFTLEVBQ21CLGlCQUFtQyxFQUMvRCxXQUF5QjtRQUp6QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQ3RDLFFBQUcsR0FBSCxHQUFHLENBQU07UUFDbUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUMvRCxnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQVo3QixnQkFBVyxHQUFhLEtBQUssQ0FBQztRQUM5QixTQUFJLEdBQVcsSUFBSSxDQUFDLENBQUMsc0JBQXNCO1FBQzNDLGdCQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsaURBQWlEO0lBV3RFLENBQUM7SUFFSixnQ0FBUSxHQUFSO1FBQUEsaUJBZUM7UUFkQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzNDLEtBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FB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QixFQUFFLENBQUM7OEJBQWEsdUJBQWdCO2dEQUFDO0FBQzdEO0lBQWxCLGdCQUFTLENBQUMsTUFBTSxDQUFDOzhCQUFlLGlCQUFVO2tEQUFDO0FBUmpDLGFBQWE7SUFQekIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxNQUFNO1FBQ2hCLFdBQVcsRUFBRSxzQkFBc0I7UUFDbkMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLEVBQUUscUJBQXFCLENBQUM7UUFDaEUsU0FBUyxFQUFFLENBQUMsMEJBQVcsQ0FBQztLQUN6QixDQUFDO0lBZ0JLLFdBQUEsYUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUE7cUNBSFosdUJBQWM7UUFDQSx3QkFBaUI7UUFDakMsV0FBSTtRQUNzQyxvQ0FBZ0I7UUFDakQsMEJBQVc7R0FmMUIsYUFBYSxDQXdaekI7QUF4Wlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIENvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLFxuICAgICAgICBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFxuICAgICAgICBWaWV3Q29udGFpbmVyUmVmLCBBZnRlclZpZXdJbml0LCBSZW5kZXJlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBEeW5hbWljQ29tcG9uZW50IH0gZnJvbSBcIi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvZHluYW1pYy5jb21wb25lbnRcIjtcbmltcG9ydCB7IEZvcm1TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9tb2RlbHMvZm9ybS9mb3JtLnNlcnZpY2VcIjtcbmltcG9ydCB7IEVsZW1lbnRGYWN0b3J5LCBBYnN0cmFjdEVsZW1lbnQgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2ZhY3RvcnkvZWxlbWVudFwiO1xuXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5cbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInVpL2xhYmVsXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBDaGVja0JveCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtY2hlY2tib3hcIjtcbmltcG9ydCB7IFByb3h5Vmlld0NvbnRhaW5lciB9IGZyb20gXCJ1aS9wcm94eS12aWV3LWNvbnRhaW5lclwiXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xuaW1wb3J0IGRpYWxvZ3MgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcbmltcG9ydCB7IEltYWdlIH0gZnJvbSBcInVpL2ltYWdlXCI7XG5pbXBvcnQgeyBEcm9wRG93biB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7IFxuaW1wb3J0ICogYXMgY2FtZXJhIGZyb20gXCJuYXRpdmVzY3JpcHQtY2FtZXJhXCI7XG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tIFwiaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgeyBTcWxpdGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2RhdGEvcHJvdmlkZXJzL3NxbGl0ZVwiO1xuXG52YXIgaW1hZ2VwaWNrZXIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCIpO1xuXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2NvbmZpZ1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiZm9ybVwiLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9mb3JtL2Zvcm0uaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2Zvcm0vZm9ybS1jb21tb24uY3NzXCIsIFwicGFnZXMvZm9ybS9mb3JtLmNzc1wiXSxcbiAgcHJvdmlkZXJzOiBbRm9ybVNlcnZpY2VdXG59KVxuXG5leHBvcnQgY2xhc3MgRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgaWQgOiBudW1iZXI7XG4gIHByaXZhdGUgc3ViIDogYW55O1xuICBwcml2YXRlIGZvcm1Mb2FkaW5nIDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHBhZ2U6IE9iamVjdCA9IG51bGw7IC8vTG9rYWFsIGZvcm0gcmVuZGVyZW5cbiAgcHJpdmF0ZSBmb3JtUGF5bG9hZCA9IFtdOyAvL0FycmF5IE9iamVjdCBkYXQgdWl0ZWluZGVsaWprICd2ZXJ3ZXJrdCcgd29yZHQuXG4gIHByaXZhdGUgZGI6IFNxbGl0ZTtcbiAgQFZpZXdDaGlsZChcImNvbnRhaW5lclwiLHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBjb250YWluZXIgOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKFwiZm9ybVwiKSBmb3JtRWxlbWVudCA6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgIHByaXZhdGUgZG9tOiBQYWdlLFxuICAgICAgQEluamVjdChcIkR5bmFtaWNDb21wb25lbnRcIikgcHJpdmF0ZSBfZHluYW1pY0NvbXBvbmVudDogRHluYW1pY0NvbXBvbmVudCxcbiAgICAgIHByaXZhdGUgZm9ybVNlcnZpY2UgOiBGb3JtU2VydmljZVxuICAgICkge31cblxuICAgIG5nT25Jbml0KCl7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgICB0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICB0aGlzLmlkID0gK3BhcmFtc1sncGFnZV9pZCddO1xuICAgICAgICBjb25zb2xlLmxvZygndGhpcy5pZCAgPScgKyB0aGlzLmlkKTtcblxuICAgICAgICBpZihpc05hTih0aGlzLmlkKSB8fCB0aGlzLmlkID09PSA5OSl7XG4gICAgICAgICAgdGhpcy5pZD05OTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZURlbW9QYWdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVQYWdlKCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKXtcbiAgICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlUGFnZSgpe1xuICAgICAgaWYoQ29uZmlnLmlzTmV0d29ya0F2YWlsYWJsZSlcbiAgICAgICAgdGhpcy5mb3JtU2VydmljZS5sb2FkUGFnZSh0aGlzLmlkKS5zdWJzY3JpYmUoKGRhdGEpPT57XG4gICAgICAgICAgdGhpcy5jbGVhclBhZ2UoKTtcbiAgICAgICAgICB0aGlzLnBhZ2UgPSBkYXRhO1xuICAgICAgICAgIHRoaXMuZGIuc2V0U2V0dGluZygncGFnZV8nK3RoaXMuaWQsZGF0YSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJQYWdlKCk7XG4gICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgZWxzZSB7XG4gICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRiLmdldFNldHRpbmcoJ3BhZ2VfJyt0aGlzLmlkKTtcbiAgICAgICAgICB0aGlzLmNsZWFyUGFnZSgpO1xuICAgICAgICAgIHRoaXMucGFnZSA9IGRhdGE7XG4gICAgICAgICAgdGhpcy5yZW5kZXJQYWdlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlRGVtb1BhZ2UoKXtcbiAgICAgIHRoaXMuY2xlYXJQYWdlKCk7XG4gICAgICB0aGlzLnBhZ2UgPSB7XG4gICAgICAgICdJZCc6IDk5LFxuICAgICAgICAnVGl0bGUnOiAnU3RhcnRwYWdpbmEnLFxuICAgICAgICAnUm93cyc6W3tcbiAgICAgICAgICAnSWQnOiAxLFxuICAgICAgICAgICdWaXNpYmxlJzp0cnVlLFxuICAgICAgICAgICdUaXRsZSc6J1dlbGtvbScsXG4gICAgICAgICAgJ0VsZW1lbnRzJzpbe1xuICAgICAgICAgICAgJ0xhYmVsJzonV2Vsa29tJyxcbiAgICAgICAgICAgICdUeXBlJzonaGVhZGVyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgJ0xhYmVsJzonV2Vsa29tIDInLFxuICAgICAgICAgICAgJ1R5cGUnOidoZWFkZXInXG4gICAgICAgICAgfV0gXG4gICAgICAgIH1dXG4gICAgICB9O1xuICAgICAgdGhpcy5yZW5kZXJQYWdlKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyUGFnZSgpe1xuICAgICAgdGhpcy5wYWdlWydSb3dzJ10uZm9yRWFjaCgocm93KT0+e1xuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMucGFnZS5FbGVtZW50cy5zaXplPVwiICsgcm93LkVsZW1lbnRzLmxlbmd0aCk7XG4gICAgICAgIHJvdy5FbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KT0+e1xuICAgICAgICAgIGxldCBlbGVtZW50T2JqZWN0IDogQWJzdHJhY3RFbGVtZW50O1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGFiZWxcIik7XG5cbiAgICAgICAgICBpZihlbGVtZW50LlR5cGUgPT0gJ2NoZWNrYm94JylcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYoZWxlbWVudC5MYWJlbCA9PSAnRm90bycpXG4gICAgICAgICAgICAgIGVsZW1lbnQuVHlwZSA9ICdpbWdfZ2FsbGVyeSc7XG5cbiAgICAgICAgICBlbGVtZW50T2JqZWN0ID0gRWxlbWVudEZhY3RvcnkuY3JlYXRlRWxlbWVudChlbGVtZW50LlR5cGUsIGVsZW1lbnQpO1xuXG5cbiAgICAgICAgICBpZihlbGVtZW50T2JqZWN0IT09bnVsbCl7XG4gICAgICAgICAgICAvL0FkZCBsYWJlbFxuICAgICAgICAgICAgaWYodHlwZW9mIGVsZW1lbnRPYmplY3QubGFiZWwhPT0ndW5kZWZpbmVkJ1xuICAgICAgICAgICAgICAmJiBlbGVtZW50T2JqZWN0LmxhYmVsLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBsZXQgbGFiZWxPYmplY3QgPSBFbGVtZW50RmFjdG9yeS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdsYWJlbCcsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRPYmplY3QubGFiZWwsXG4gICAgICAgICAgICAgICAgICBjbGFzczogJ2xhYmVsJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX2R5bmFtaWNDb21wb25lbnQuYWRkQ29tcG9uZW50KFxuICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIsIGxhYmVsT2JqZWN0LnJlbmRlcigpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGFiZWwxXCIpO1xuXG4gICAgICAgICAgICAvL01haW4gRWxlbWVudFxuXG4gICAgICAgICAgICBsZXQgX2NvbXBvbmVudCA9IDxhbnk+XG5cbiAgICAgICAgICAgIHRoaXMuX2R5bmFtaWNDb21wb25lbnQuYWRkQ29tcG9uZW50KFxuICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lciwgZWxlbWVudE9iamVjdC5yZW5kZXIoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkQ29tcG9uZW50IGVsZW1lbnRcIik7XG5cbiAgICAgICAgICAgIGlmKGVsZW1lbnQuVHlwZSA9PSAnZHJvcGRvd24nKSBcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVEcm9wRG93bihlbGVtZW50KTtcbiAgICAgICAgICAgIGVsc2UgaWYoZWxlbWVudC5UeXBlID09ICdyYWRpbycpXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplUmFkaW8oZWxlbWVudCk7XG5cblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMYWJlbDJcIik7XG4gICAgICAgICAgICAvL0FkZCBIZWxwZXJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBlbGVtZW50T2JqZWN0LmhlbHBlciE9PSd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICYmIGVsZW1lbnRPYmplY3QuaGVscGVyLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICBsZXQgbGFiZWxPYmplY3QgPSBFbGVtZW50RmFjdG9yeS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdsYWJlbCcsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnRPYmplY3QuaGVscGVyLFxuICAgICAgICAgICAgICAgICAgY2xhc3M6ICdoZWxwZXInXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHluYW1pY0NvbXBvbmVudC5hZGRDb21wb25lbnQoXG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lciwgbGFiZWxPYmplY3QucmVuZGVyKClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMYWJlbDNcIik7XG4gICAgICAgICAgICAvL0JpbmQgZXZlbnRzXG4gICAgICAgICAgICBpZihlbGVtZW50T2JqZWN0Lmhhc0V2ZW50PT10cnVlKXtcbiAgICAgICAgICAgICAgLy9IYW5kbGUgZm9ybSBzdWJtaXNzaW9uXG4gICAgICAgICAgICAgIGlmKGVsZW1lbnQuVHlwZSA9PSAnc3VibWl0Jyl7XG4gICAgICAgICAgICAgICAgX2NvbXBvbmVudC5wcm90b3R5cGUub25UYXAgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgLy9IYW5kbGUgY2FtZXJhL3Bob3RvIGNsaWNrXG4gICAgICAgICAgICAgIGlmKGVsZW1lbnQuVHlwZT09J2NhbWVyYScpIHtcbiAgICAgICAgICAgICAgICBfY29tcG9uZW50LnByb3RvdHlwZS5vblRhcCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudGFrZVBpY3R1cmVGcm9tQ2FtZXJhKCk7ICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYoZWxlbWVudC5UeXBlPT0gJ2ltZ19nYWxsZXJ5Jykge1xuICAgICAgICAgICAgICAgIF9jb21wb25lbnQucHJvdG90eXBlLm9uVGFwID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zaG93SW1hZ2VQaWNrZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICAgIHRoaXMuZm9ybUxvYWRpbmc9ZmFsc2U7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGNsZWFyUGFnZSgpe1xuICAgICAgdGhpcy5jb250YWluZXIuY2xlYXIoKTtcbiAgICAgIHRoaXMuZm9ybUxvYWRpbmc9ZmFsc2U7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGdldENhbWVyYUltYWdlRWxlbWVudCgpe1xuICAgICAgbGV0IGVsOiBTdGFja0xheW91dCA9IHRoaXMuZm9ybUVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgIGZvcihsZXQgaT0yO2k8ZWwuZ2V0Q2hpbGRyZW5Db3VudCgpO2krKyl7XG4gICAgICAgIGxldCBjaGlsZCA9IDxQcm94eVZpZXdDb250YWluZXI+ZWwuZ2V0Q2hpbGRBdChpKTtcbiAgICAgICAgICBmb3IobGV0IHg9MDt4PGNoaWxkLmdldENoaWxkcmVuQ291bnQoKTt4Kyspe1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSA8SW1hZ2U+Y2hpbGQuZ2V0Q2hpbGRBdCh4KTtcbiAgICAgICAgICAgIGlmKGVsZW1lbnQuY2xhc3NOYW1lID09ICdpbWdfY2FtZXJhJylcbiAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXREcm9wRG93bkVsZW1lbnQoKXtcbiAgICAgIGxldCBlbDogU3RhY2tMYXlvdXQgPSB0aGlzLmZvcm1FbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBmb3IobGV0IGk9MjtpPGVsLmdldENoaWxkcmVuQ291bnQoKTtpKyspe1xuICAgICAgICBsZXQgY2hpbGQgPSA8UHJveHlWaWV3Q29udGFpbmVyPmVsLmdldENoaWxkQXQoaSk7XG4gICAgICAgICAgZm9yKGxldCB4PTA7eDxjaGlsZC5nZXRDaGlsZHJlbkNvdW50KCk7eCsrKXtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gPERyb3BEb3duPmNoaWxkLmdldENoaWxkQXQoeCk7XG4gICAgICAgICAgICBpZihlbGVtZW50LmNsYXNzTmFtZSA9PSdkcm9wZG93bicpXG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZ2V0SW1hZ2VQaWNrZXJJbWdFbGVtZW50KCl7IFxuICAgICAgbGV0IGVsOiBTdGFja0xheW91dCA9IHRoaXMuZm9ybUVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgZm9yKGxldCBpPTI7aTxlbC5nZXRDaGlsZHJlbkNvdW50KCk7aSsrKXtcbiAgICAgICAgICBsZXQgY2hpbGQgPSA8UHJveHlWaWV3Q29udGFpbmVyPmVsLmdldENoaWxkQXQoaSk7XG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4PGNoaWxkLmdldENoaWxkcmVuQ291bnQoKTt4Kyspe1xuICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IDxJbWFnZT5jaGlsZC5nZXRDaGlsZEF0KHgpO1xuICAgICAgICAgICAgICBpZihlbGVtZW50LmNsYXNzTmFtZSA9PSdpbWdfZ2FsbGVyeScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRSYWRpb0VsZW1lbnQoKXtcbiAgICAgIGxldCBlbDogU3RhY2tMYXlvdXQgPSB0aGlzLmZvcm1FbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBmb3IobGV0IGk9MjtpPGVsLmdldENoaWxkcmVuQ291bnQoKTtpKyspe1xuICAgICAgICBsZXQgY2hpbGQgPSA8UHJveHlWaWV3Q29udGFpbmVyPmVsLmdldENoaWxkQXQoaSk7XG4gICAgICAgICAgZm9yKGxldCB4PTA7eDxjaGlsZC5nZXRDaGlsZHJlbkNvdW50KCk7eCsrKXtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gPERyb3BEb3duPmNoaWxkLmdldENoaWxkQXQoeCk7XG4gICAgICAgICAgICBpZihlbGVtZW50LmNsYXNzTmFtZSA9PSdyYWRpbycpXG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0YWtlUGljdHVyZUZyb21DYW1lcmEoKXtcbiAgICAgIGNhbWVyYS5yZXF1ZXN0UGVybWlzc2lvbnMoKTtcbiAgICAgIGxldCBpc0NhbWVyYUF2YWlsYWJsZSA9IGNhbWVyYS5pc0F2YWlsYWJsZSgpO1xuICAgICAgbGV0IHN0ckNhbWVyYTpzdHJpbmcgPSBcIkNhbWVyYSBpcyBub3QgYXZhaWxhYmxlXCI7XG4gICAgICBpZihpc0NhbWVyYUF2YWlsYWJsZSA9PSBmYWxzZSkge1xuICAgICAgICAvL2RpYWxvZy5hbGVydChzdHJDYW1lcmEpO1xuICAgICAgICAvL3JldHVybjtcbiAgICAgIH1cbiAgICAgIGNhbWVyYS50YWtlUGljdHVyZSgpXG4gICAgICAgIC50aGVuKChpbWFnZUFzc2V0KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJSZXN1bHQgaXMgYW4gaW1hZ2UgYXNzZXQgaW5zdGFuY2VcIik7XG4gICAgICAgICAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VBc3NldDtcbiAgICAgICAgICBpbWFnZVNvdXJjZS5mcm9tQXNzZXQoaW1hZ2VBc3NldClcbiAgICAgICAgICAudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnd2lkdGggPScgKyByZXMud2lkdGgpO1xuICAgICAgICAgICAgICBsZXQgY2FtZXJhSW1nRWxlbWVudDpJbWFnZSA9IDxJbWFnZT50aGlzLmdldENhbWVyYUltYWdlRWxlbWVudCgpO1xuICAgICAgICAgICAgICBjYW1lcmFJbWdFbGVtZW50LnNyYyA9IHJlcztcbiAgICAgICAgICAgICAgbGV0IG15SW1hZ2VTb3VyY2U6aW1hZ2VTb3VyY2UuSW1hZ2VTb3VyY2UgPSBuZXcgaW1hZ2VTb3VyY2UuSW1hZ2VTb3VyY2UoKTtcbiAgICAgICAgICAgICAgbXlJbWFnZVNvdXJjZSA9IDxpbWFnZVNvdXJjZS5JbWFnZVNvdXJjZT5jYW1lcmFJbWdFbGVtZW50LnNyYztcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Jhc2U2NCBzdHJpbmcgPSAnICsgbXlJbWFnZVNvdXJjZS50b0Jhc2U2NFN0cmluZyhcInBuZ1wiKSk7XG4gICAgICAgICAgfSwoZXJyb3IpPT57IFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBsb2FkaW5nIGltYWdlOlwiICtlcnJvcik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLT4gXCIgKyBlcnIubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgfVxuXG4gICAgc2hvd0ltYWdlUGlja2VyKCl7XG4gICAgICBsZXQgY29udGV4dCA9IGltYWdlcGlja2VyLmNyZWF0ZSh7XG4gICAgICAgIG1vZGU6XCJzaW5nbGVcIlxuICAgICAgfSk7XG4gICAgICBjb250ZXh0XG4gICAgICAgIC5hdXRob3JpemUoKVxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnByZXNlbnQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHNlbGVjdGlvbikgPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGlvbiBkb25lOlwiKTtcbiAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKChzZWxlY3RlZCkgPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIgLSBcIiArIHNlbGVjdGVkLnVyaSk7XG4gICAgICAgICAgICAgICAgbGV0IHBpY2tlckltZ0VsZW1lbnQ6SW1hZ2UgPSA8SW1hZ2U+dGhpcy5nZXRJbWFnZVBpY2tlckltZ0VsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICAgIGxldCBSRVFVSVJFRF9TSVpFID0ge1xuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogODAwLFxuICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IDgwMFxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEltZ1NvdXJjZSA9IHNlbGVjdGVkLmRlY29kZVVyaShzZWxlY3RlZC5fdXJpLCBSRVFVSVJFRF9TSVpFKTtcbiAgICAgICAgICAgICAgICAgIHBpY2tlckltZ0VsZW1lbnQuc3JjID0gc2VsZWN0ZWRJbWdTb3VyY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkLmdldEltYWdlKCkudGhlbigoaW1nU291cmNlKSA9PiB7ICAgICBcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGRkZmQnKTtcbiAgICAgICAgICAgICAgICAgICBwaWNrZXJJbWdFbGVtZW50LnNyYyA9IGltZ1NvdXJjZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZVJhZGlvKHJhZGlvU3RyaW5nKXtcbiAgICAgIGxldCBkYXRhID0gW107XG4gICAgICBsZXQgc2VsZWN0ZWRJbmRleDpudW1iZXIgPSAwO1xuICAgICAgbGV0IG9wdGlvbnMgPSBKU09OLnBhcnNlKHJhZGlvU3RyaW5nWydPcHRpb25zJ10pO1xuICAgICAgb3B0aW9ucy5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgICAgZGF0YS5wdXNoKHJvd1snVGl0bGUnXSk7XG4gICAgICAgIGlmKHJvd1snU2VsZWN0ZWQnXSA9PSB0cnVlKSBcbiAgICAgICAgICBzZWxlY3RlZEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICAgICAgfSk7XG4gICAgICBsZXQgcmFkaW9FbGVtZW50OkRyb3BEb3duID0gPERyb3BEb3duPiB0aGlzLmdldFJhZGlvRWxlbWVudCgpO1xuICAgICAgcmFkaW9FbGVtZW50LnNlbGVjdGVkSW5kZXggPSBzZWxlY3RlZEluZGV4O1xuICAgICAgcmFkaW9FbGVtZW50Lml0ZW1zID0gZGF0YTtcbiAgICB9XG5cblxuICAgIGluaXRpYWxpemVEcm9wRG93bihkcm9wRG93blN0cmluZyl7XG4gICAgICBsZXQgZGF0YSA9IFtdO1xuICAgICAgbGV0IHNlbGVjdGVkSW5kZXg6bnVtYmVyID0gMDtcbiAgICAgIGxldCBvcHRpb25zID0gSlNPTi5wYXJzZShkcm9wRG93blN0cmluZ1snT3B0aW9ucyddKTtcbiAgICAgIG9wdGlvbnMuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICAgIGRhdGEucHVzaChyb3dbJ1RpdGxlJ10pO1xuICAgICAgICBpZihyb3dbJ1NlbGVjdGVkJ10gPT0gdHJ1ZSkgXG4gICAgICAgICAgc2VsZWN0ZWRJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgICAgIH0pO1xuICAgICAgbGV0IGRyb3BEb3duRWxlbWVudDpEcm9wRG93biA9IDxEcm9wRG93bj4gdGhpcy5nZXREcm9wRG93bkVsZW1lbnQoKTtcbiAgICAgIGRyb3BEb3duRWxlbWVudC5zZWxlY3RlZEluZGV4ID0gc2VsZWN0ZWRJbmRleDtcbiAgICAgIGRyb3BEb3duRWxlbWVudC5pdGVtcyA9IGRhdGE7XG4gICAgfVxuXG4gICAgc3VibWl0KCl7XG4gICAgICB0aGlzLmZvcm1QYXlsb2FkID0gW107XG4gICAgICB0aGlzLmZvcm1QYXlsb2FkLnB1c2goe1xuICAgICAgICBFbGVtZW50SUQ6dGhpcy5pZFxuICAgICAgfSk7XG4gICAgICBsZXQgZWxlbWVudHMgPSBbXTtcbiAgICAgIGxldCBlbDogU3RhY2tMYXlvdXQgPSB0aGlzLmZvcm1FbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIGNvbnNvbGUubG9nKCdDaGlsZHJlbiBDb3VudDonICsgZWwuZ2V0Q2hpbGRyZW5Db3VudCgpKTtcbiAgICAgIGZvcihsZXQgaT0yO2k8ZWwuZ2V0Q2hpbGRyZW5Db3VudCgpO2krKyl7XG5cbiAgICAgICAgLy9pbmRleCBzdGFydHMgYXQgMiAtPiAwLWFjdGl2aXR5aW5kaWNhdG9yLDEtc3RhY2tsYXlvdXRcbiAgICAgICAgbGV0IGNoaWxkID0gPFByb3h5Vmlld0NvbnRhaW5lcj5lbC5nZXRDaGlsZEF0KGkpO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJ1Byb3h5IENoaWxkIENvdW50OicgKyBjaGlsZC5nZXRDaGlsZHJlbkNvdW50KCkpO1xuXG4gICAgICAgIGZvcihsZXQgeD0wO3g8Y2hpbGQuZ2V0Q2hpbGRyZW5Db3VudCgpO3grKyl7XG4gICAgICAgICAgXG4gICAgICAgICAgbGV0IGltZ0VsZW1lbnQgPSA8SW1hZ2U+IGNoaWxkLmdldENoaWxkQXQoeCk7XG5cbiAgICAgICAgICBpZihpbWdFbGVtZW50LmNsYXNzTmFtZSA9PSAnaW1nX2NhbWVyYScgfHwgaW1nRWxlbWVudC5jbGFzc05hbWUgPT0gJ2ltZ19nYWxsZXJ5JyApe1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW1nRWxlbWVudCcpO1xuXG4gICAgICAgICAgICBsZXQgbXlJbWFnZVNvdXJjZTppbWFnZVNvdXJjZS5JbWFnZVNvdXJjZSA9IG5ldyBpbWFnZVNvdXJjZS5JbWFnZVNvdXJjZSgpO1xuICAgICAgICAgICAgbXlJbWFnZVNvdXJjZSA9IDxpbWFnZVNvdXJjZS5JbWFnZVNvdXJjZT5pbWdFbGVtZW50LnNyYztcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Jhc2U2NCBzdHJpbmcgPSAnICsgbXlJbWFnZVNvdXJjZS50b0Jhc2U2NFN0cmluZyhcInBuZ1wiKSk7XG4gICAgICAgICAgXG4gICAgICAgICAgICBpZihteUltYWdlU291cmNlIT11bmRlZmluZWQpXG4gICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICdpZCc6aW1nRWxlbWVudC5pZCxcbiAgICAgICAgICAgICAgICAndmFsdWUnOm15SW1hZ2VTb3VyY2UudG9CYXNlNjRTdHJpbmcoXCJwbmdcIilcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IGRyb3BEb3duRWxlbWVudCA9IDxEcm9wRG93bj5jaGlsZC5nZXRDaGlsZEF0KHgpO1xuICAgICAgICAgIGlmKGRyb3BEb3duRWxlbWVudC5jbGFzc05hbWUgPT0gJ2Ryb3Bkb3duJyB8fFxuICAgICAgICAgICAgICAgICAgZHJvcERvd25FbGVtZW50LmNsYXNzTmFtZSA9PSAncmFkaW8nKXtcbiAgICAgICAgICAgICAgaWYoZHJvcERvd25FbGVtZW50Lml0ZW1zLmxlbmd0aD4wKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZHJvcERvd24gSXRlbSA9JyArIGRyb3BEb3duRWxlbWVudC5pdGVtc1tkcm9wRG93bkVsZW1lbnQuc2VsZWN0ZWRJbmRleF0pO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgJ2lkJzpkcm9wRG93bkVsZW1lbnQuaWQsXG4gICAgICAgICAgICAgICAgICAndmFsdWUnOmRyb3BEb3duRWxlbWVudC5pdGVtc1tkcm9wRG93bkVsZW1lbnQuc2VsZWN0ZWRJbmRleF1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCB2YWx1ZSA9IDxUZXh0RmllbGQ+Y2hpbGQuZ2V0Q2hpbGRBdCh4KTtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCd2YWx1ZS50ZXh0ID0gJyArIHZhbHVlLnRleHQpO1xuICAgICAgICAgIC8vY29uc29sZS5sb2coJ3ZhbHVlLmlkID0gJyArIHZhbHVlLmlkKTtcbiAgICAgICAgICBpZih2YWx1ZS50ZXh0ICYmIHZhbHVlLmlkKXtcbiAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAnaWQnOnZhbHVlLmlkLFxuICAgICAgICAgICAgICAndmFsdWUnOnZhbHVlLnRleHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IG15SnNvbiA9IHtcbiAgICAgICAgJ0RhdGFTdHJpbmcnOmVsZW1lbnRzXG4gICAgICB9O1xuICAgICAgdGhpcy5mb3JtUGF5bG9hZC5wdXNoKG15SnNvbik7XG4gICAgICB0aGlzLmZvcm1QYXlsb2FkLnB1c2goeydHVUlEJzpDb25maWcuYXV0aFRva2VufSk7XG5cbiAgICAgIGxldCBmb3JtUGF5bG9hZEpzb246c3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodGhpcy5mb3JtUGF5bG9hZCk7XG5cbiAgICAgIGxldCBqc29uOnN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgRWxlbWVudElEOnRoaXMuaWQsXG4gICAgICAgIERhdGFTdHJpbmc6ICd7XCJpZFwiOjEwLFwidmFsdWVcIjpcIkFhYVwifScsXG4gICAgICAgIC8vaXQgaXMgY29tbWVudGVkIHNpbmNlIGl0IGlzIG5vdCBoYW5kbGVkIG9uIGJhY2tlbmRcbiAgICAgICAgLy9EYXRhU3RyaW5nOiBlbGVtZW50cywgIFxuICAgICAgICBHVUlEOkNvbmZpZy5hdXRoVG9rZW5cbiAgICAgIH0pO1xuXG4gICAgICBjb25zb2xlLmxvZygnZm9ybVBheWxvYWQgPSAnICsgZm9ybVBheWxvYWRKc29uKTtcblxuXG4gICAgICB0aGlzLmZvcm1TZXJ2aWNlLnN1Ym1pdEZvcm0odGhpcy5pZCwganNvbikuc3Vic2NyaWJlKChkYXRhKT0+e1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSk7XG5cbiAgICAgIFxuICAgICAgLy9jb25zb2xlLmR1bXAodGhpcy5mb3JtUGF5bG9hZCk7XG5cbiAgICAgIGxldCBzdHJEaWFsb2cgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgZm9ybVBheWxvYWQ6IHRoaXMuZm9ybVBheWxvYWR9KTtcblxuICAgICAgLy9kaWFsb2dzLmFsZXJ0KHN0ckRpYWxvZykudGhlbigoKT0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAvL30pO1xuICAgIH0gICAgXG59Il19