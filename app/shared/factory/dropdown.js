"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DropDown = (function () {
    function DropDown() {
        var options = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            options[_i] = arguments[_i];
        }
        var _this = this;
        this.render = function () {
            return _this.renderDropDown();
        };
        options = options[0];
        this.id = options['Id'];
        this.value = options['Value'];
        this.label = options['Label'];
        this.helper = options['Helper'];
        this.type = options['Type'];
        this.shouldSubmit = true;
        this.options = JSON.parse(options['Options']);
    }
    DropDown.prototype.renderDropDown = function () {
        var strHtml = '';
        strHtml += "<DropDown id=\"" + this.id + "\" ";
        strHtml += "class=";
        strHtml += "\"" + this.type + "\"";
        strHtml += " row = \"0\" colSpan = \"2\" >";
        strHtml += " </DropDown>";
        console.log("renderDropDown:" + strHtml);
        return strHtml;
    };
    return DropDown;
}());
exports.DropDown = DropDown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcm9wZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBdUJJO1FBQVksaUJBQVU7YUFBVixVQUFVLEVBQVYscUJBQVUsRUFBVixJQUFVO1lBQVYsNEJBQVU7O1FBQXRCLGlCQVNDO1FBdEJELFdBQU0sR0FBRztZQUNMLE1BQU0sQ0FBQyxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDakMsQ0FBQyxDQUFBO1FBWUcsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQW5CRCxpQ0FBYyxHQUFkO1FBQ0ksSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxpQkFBZ0IsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEtBQUksQ0FBQztRQUN6QyxPQUFPLElBQUksUUFBUSxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxJQUFHLEdBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFHLENBQUM7UUFDN0IsT0FBTyxJQUFJLGdDQUE0QixDQUFDO1FBQ3hDLE9BQU8sSUFBSSxjQUFjLENBQUM7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFXTCxlQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQztBQWpDWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0RWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRcIjtcblxuZXhwb3J0IGNsYXNzIERyb3BEb3duIGltcGxlbWVudHMgQWJzdHJhY3RFbGVtZW50IHtcbiAgICBwdWJsaWMgaWQ6IG51bWJlcjtcbiAgICBwdWJsaWMgdmFsdWU6IHN0cmluZztcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgICBwdWJsaWMgaGVscGVyOiBzdHJpbmc7XG4gICAgcHVibGljIHR5cGU6IHN0cmluZztcbiAgICBwdWJsaWMgb3B0aW9uczogQXJyYXk8T2JqZWN0PjtcbiAgICBwdWJsaWMgaGFzRXZlbnQ6IGJvb2xlYW47XG4gICAgcHVibGljIHNob3VsZFN1Ym1pdDogYm9vbGVhbjtcblxuICAgIHJlbmRlciA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRHJvcERvd24oKTtcbiAgICB9XG4gICAgcmVuZGVyRHJvcERvd24oKXtcbiAgICAgICAgbGV0IHN0ckh0bWwgPSAnJztcbiAgICAgICAgc3RySHRtbCArPSBgPERyb3BEb3duIGlkPVwiYCt0aGlzLmlkK2BcIiBgO1xuICAgICAgICBzdHJIdG1sICs9IGBjbGFzcz1gO1xuICAgICAgICBzdHJIdG1sICs9IGBcImArdGhpcy50eXBlK2BcImA7XG4gICAgICAgIHN0ckh0bWwgKz0gYCByb3cgPSBcIjBcIiBjb2xTcGFuID0gXCIyXCIgPmA7XG4gICAgICAgIHN0ckh0bWwgKz0gYCA8L0Ryb3BEb3duPmA7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVuZGVyRHJvcERvd246XCIrc3RySHRtbCk7XG4gICAgICAgIHJldHVybiBzdHJIdG1sO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvciguLi5vcHRpb25zKXtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnNbMF07XG4gICAgICAgIHRoaXMuaWQgPSBvcHRpb25zWydJZCddO1xuICAgICAgICB0aGlzLnZhbHVlID0gb3B0aW9uc1snVmFsdWUnXTtcbiAgICAgICAgdGhpcy5sYWJlbCA9IG9wdGlvbnNbJ0xhYmVsJ107XG4gICAgICAgIHRoaXMuaGVscGVyID0gb3B0aW9uc1snSGVscGVyJ107XG4gICAgICAgIHRoaXMudHlwZSA9IG9wdGlvbnNbJ1R5cGUnXTtcbiAgICAgICAgdGhpcy5zaG91bGRTdWJtaXQgPSB0cnVlO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBKU09OLnBhcnNlKG9wdGlvbnNbJ09wdGlvbnMnXSk7XG4gICAgfVxufSJdfQ==