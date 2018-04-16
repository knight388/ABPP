"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Label = (function () {
    function Label() {
        var options = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            options[_i] = arguments[_i];
        }
        var _this = this;
        this.render = function () {
            return "<Label text=\"" + _this.value + "\" class=\"" + _this.class + "\"></Label>";
        };
        options = options[0];
        this.value = options['value'];
        this.class = options['class'];
        this.label = '';
        this.helper = '';
        console.log('Label Element');
    }
    return Label;
}());
exports.Label = Label;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBY0k7UUFBWSxpQkFBVTthQUFWLFVBQVUsRUFBVixxQkFBVSxFQUFWLElBQVU7WUFBViw0QkFBVTs7UUFBdEIsaUJBT0M7UUFYRCxXQUFNLEdBQUc7WUFDTCxNQUFNLENBQUMsZ0JBQWUsR0FBQyxLQUFJLENBQUMsS0FBSyxHQUFDLGFBQVcsR0FBQyxLQUFJLENBQUMsS0FBSyxHQUFDLGFBQVksQ0FBQztRQUMxRSxDQUFDLENBQUE7UUFHRyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDO0FBdEJZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudFwiO1xuXG5leHBvcnQgY2xhc3MgTGFiZWwgaW1wbGVtZW50cyBBYnN0cmFjdEVsZW1lbnQge1xuICAgIHB1YmxpYyBpZDogbnVtYmVyO1xuICAgIHB1YmxpYyB2YWx1ZTogc3RyaW5nO1xuICAgIHB1YmxpYyBsYWJlbDogc3RyaW5nO1xuICAgIHB1YmxpYyBoZWxwZXI6IHN0cmluZztcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xuICAgIHB1YmxpYyBjbGFzczogc3RyaW5nO1xuICAgIHB1YmxpYyBoYXNFdmVudDogYm9vbGVhbjtcbiAgICBwdWJsaWMgc2hvdWxkU3VibWl0OiBib29sZWFuO1xuXG4gICAgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gYDxMYWJlbCB0ZXh0PVwiYCt0aGlzLnZhbHVlK2BcIiBjbGFzcz1cImArdGhpcy5jbGFzcytgXCI+PC9MYWJlbD5gO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKC4uLm9wdGlvbnMpe1xuICAgICAgICBvcHRpb25zID0gb3B0aW9uc1swXTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG9wdGlvbnNbJ3ZhbHVlJ107XG4gICAgICAgIHRoaXMuY2xhc3MgPSBvcHRpb25zWydjbGFzcyddO1xuICAgICAgICB0aGlzLmxhYmVsID0gJyc7XG4gICAgICAgIHRoaXMuaGVscGVyID0gJyc7XG4gICAgICAgIGNvbnNvbGUubG9nKCdMYWJlbCBFbGVtZW50Jyk7XG4gICAgfVxufSJdfQ==