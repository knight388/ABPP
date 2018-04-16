"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImagePicker = (function () {
    function ImagePicker() {
        var options = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            options[_i] = arguments[_i];
        }
        var _this = this;
        this.render = function () {
            return "" +
                "<Label text=\"test\"></Label>" +
                "<Image width=\"100\" height=\"100\" src=\"res://logo\" \n        id=\"" + _this.id + "\" class=\"img_gallery\"></Image>" +
                "<Button text=\"Foto maken/selecteren\" class=\"camera-button\" (tap)=\"onTap()\"></Button>";
        };
        console.log('ImagePicker Element');
        options = options[0];
        this.id = options['Id'];
        this.value = options['Value'];
        this.label = options['Label'];
        this.helper = options['Helper'];
        this.hasEvent = true;
        this.shouldSubmit = true;
    }
    return ImagePicker;
}());
exports.ImagePicker = ImagePicker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VwaWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBaUJJO1FBQVksaUJBQVU7YUFBVixVQUFVLEVBQVYscUJBQVUsRUFBVixJQUFVO1lBQVYsNEJBQVU7O1FBQXRCLGlCQVNDO1FBakJELFdBQU0sR0FBRztZQUNOLE1BQU0sQ0FBQyxFQUFFO2dCQUNULCtCQUE2QjtnQkFDNUIsd0VBQ0ssR0FBQyxLQUFJLENBQUMsRUFBRSxHQUFDLG1DQUFnQztnQkFDOUMsNEZBQXNGLENBQUM7UUFDM0YsQ0FBQyxDQUFBO1FBR0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQztBQTNCWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0RWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRcIjtcblxuZXhwb3J0IGNsYXNzIEltYWdlUGlja2VyIGltcGxlbWVudHMgQWJzdHJhY3RFbGVtZW50IHtcbiAgICBwdWJsaWMgaWQ6IG51bWJlcjtcbiAgICBwdWJsaWMgdmFsdWU6IHN0cmluZztcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgICBwdWJsaWMgaGVscGVyOiBzdHJpbmc7XG4gICAgcHVibGljIHR5cGU6IHN0cmluZztcbiAgICBwdWJsaWMgaGFzRXZlbnQ6IGJvb2xlYW47XG4gICAgcHVibGljIHNob3VsZFN1Ym1pdDogYm9vbGVhbjtcblxuICAgIHJlbmRlciA9ICgpID0+IHtcbiAgICAgICByZXR1cm4gYGArXG4gICAgICAgYDxMYWJlbCB0ZXh0PVwidGVzdFwiPjwvTGFiZWw+YCtcbiAgICAgICAgYDxJbWFnZSB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiIHNyYz1cInJlczovL2xvZ29cIiBcbiAgICAgICAgaWQ9XCJgK3RoaXMuaWQrYFwiIGNsYXNzPVwiaW1nX2dhbGxlcnlcIj48L0ltYWdlPmArXG4gICAgICAgIGA8QnV0dG9uIHRleHQ9XCJGb3RvIG1ha2VuL3NlbGVjdGVyZW5cIiBjbGFzcz1cImNhbWVyYS1idXR0b25cIiAodGFwKT1cIm9uVGFwKClcIj48L0J1dHRvbj5gO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKC4uLm9wdGlvbnMpe1xuICAgICAgICBjb25zb2xlLmxvZygnSW1hZ2VQaWNrZXIgRWxlbWVudCcpO1xuICAgICAgICBvcHRpb25zID0gb3B0aW9uc1swXTtcbiAgICAgICAgdGhpcy5pZCA9IG9wdGlvbnNbJ0lkJ107XG4gICAgICAgIHRoaXMudmFsdWUgPSBvcHRpb25zWydWYWx1ZSddO1xuICAgICAgICB0aGlzLmxhYmVsID0gb3B0aW9uc1snTGFiZWwnXTtcbiAgICAgICAgdGhpcy5oZWxwZXIgPSBvcHRpb25zWydIZWxwZXInXTtcbiAgICAgICAgdGhpcy5oYXNFdmVudD10cnVlO1xuICAgICAgICB0aGlzLnNob3VsZFN1Ym1pdD10cnVlO1xuICAgIH1cbn0iXX0=