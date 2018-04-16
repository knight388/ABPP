"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Camera = (function () {
    function Camera() {
        var options = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            options[_i] = arguments[_i];
        }
        var _this = this;
        this.render = function () {
            return "" +
                "<Label text=\"test\"></Label>" +
                "<Image width=\"100\" height=\"100\" src=\"res://logo\" id=\"" + _this.id + "\" class=\"img_camera\"></Image>" +
                "<Button text=\"Foto maken/selecteren\" class=\"camera-button\" (tap)=\"onTap()\"></Button>";
        };
        console.log('Camera Element');
        options = options[0];
        this.id = options['Id'];
        this.value = options['Value'];
        this.label = options['Label'];
        this.helper = options['Helper'];
        this.hasEvent = true;
        this.shouldSubmit = true;
    }
    return Camera;
}());
exports.Camera = Camera;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtZXJhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FtZXJhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFnQkk7UUFBWSxpQkFBVTthQUFWLFVBQVUsRUFBVixxQkFBVSxFQUFWLElBQVU7WUFBViw0QkFBVTs7UUFBdEIsaUJBU0M7UUFoQkQsV0FBTSxHQUFHO1lBQ04sTUFBTSxDQUFDLEVBQUU7Z0JBQ1QsK0JBQTZCO2dCQUM1Qiw4REFBdUQsR0FBQyxLQUFJLENBQUMsRUFBRSxHQUFDLGtDQUErQjtnQkFDL0YsNEZBQXNGLENBQUM7UUFDM0YsQ0FBQyxDQUFBO1FBR0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBMUJZLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudFwiO1xuXG5leHBvcnQgY2xhc3MgQ2FtZXJhIGltcGxlbWVudHMgQWJzdHJhY3RFbGVtZW50IHtcbiAgICBwdWJsaWMgaWQ6IG51bWJlcjtcbiAgICBwdWJsaWMgdmFsdWU6IHN0cmluZztcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgICBwdWJsaWMgaGVscGVyOiBzdHJpbmc7XG4gICAgcHVibGljIHR5cGU6IHN0cmluZztcbiAgICBwdWJsaWMgaGFzRXZlbnQ6IGJvb2xlYW47XG4gICAgcHVibGljIHNob3VsZFN1Ym1pdDogYm9vbGVhbjtcblxuICAgIHJlbmRlciA9ICgpID0+IHtcbiAgICAgICByZXR1cm4gYGArXG4gICAgICAgYDxMYWJlbCB0ZXh0PVwidGVzdFwiPjwvTGFiZWw+YCtcbiAgICAgICAgYDxJbWFnZSB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiIHNyYz1cInJlczovL2xvZ29cIiBpZD1cImArdGhpcy5pZCtgXCIgY2xhc3M9XCJpbWdfY2FtZXJhXCI+PC9JbWFnZT5gK1xuICAgICAgICBgPEJ1dHRvbiB0ZXh0PVwiRm90byBtYWtlbi9zZWxlY3RlcmVuXCIgY2xhc3M9XCJjYW1lcmEtYnV0dG9uXCIgKHRhcCk9XCJvblRhcCgpXCI+PC9CdXR0b24+YDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvciguLi5vcHRpb25zKXtcbiAgICAgICAgY29uc29sZS5sb2coJ0NhbWVyYSBFbGVtZW50Jyk7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zWzBdO1xuICAgICAgICB0aGlzLmlkID0gb3B0aW9uc1snSWQnXTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG9wdGlvbnNbJ1ZhbHVlJ107XG4gICAgICAgIHRoaXMubGFiZWwgPSBvcHRpb25zWydMYWJlbCddO1xuICAgICAgICB0aGlzLmhlbHBlciA9IG9wdGlvbnNbJ0hlbHBlciddO1xuICAgICAgICB0aGlzLmhhc0V2ZW50PXRydWU7XG4gICAgICAgIHRoaXMuc2hvdWxkU3VibWl0PXRydWU7XG4gICAgfVxufSJdfQ==