"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Checkbox = (function () {
    function Checkbox() {
        var options = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            options[_i] = arguments[_i];
        }
        var _this = this;
        this.render = function () {
            console.log("<CheckBox id=\"" + _this.id + "\" text=\"" + _this.value + "\" class=\"shouldSubmit\" checked=\"false\"></CheckBox>");
            return "<CheckBox id=\"" + _this.id + "\" text=\"" + _this.value + "\" class=\"shouldSubmit\" checked=\"false\"></CheckBox>";
        };
        console.log('CheckBox');
        options = options[0];
        this.id = options['Id'];
        this.value = options['Label'];
        this.label = '';
        this.helper = options['Helper'];
        this.shouldSubmit = true;
        console.log(JSON.stringify({
            cameraOptions: options
        }));
        //this.options = JSON.parse(options['Options']);
        console.log('CheckBox1');
    }
    return Checkbox;
}());
exports.Checkbox = Checkbox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBZUk7UUFBWSxpQkFBVTthQUFWLFVBQVUsRUFBVixxQkFBVSxFQUFWLElBQVU7WUFBViw0QkFBVTs7UUFBdEIsaUJBZ0JDO1FBckJELFdBQU0sR0FBRztZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWdCLEdBQUMsS0FBSSxDQUFDLEVBQUUsR0FBQyxZQUFVLEdBQUMsS0FBSSxDQUFDLEtBQUssR0FBQyx5REFBb0QsQ0FBQyxDQUFDO1lBQ2pILE1BQU0sQ0FBQyxpQkFBZ0IsR0FBQyxLQUFJLENBQUMsRUFBRSxHQUFDLFlBQVUsR0FBQyxLQUFJLENBQUMsS0FBSyxHQUFDLHlEQUFvRCxDQUFDO1FBQy9HLENBQUMsQ0FBQTtRQUdHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyQixJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQztRQUV2QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDdkIsYUFBYSxFQUFFLE9BQU87U0FDekIsQ0FBQyxDQUFDLENBQUM7UUFFSixnREFBZ0Q7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFoQ0QsSUFnQ0M7QUFoQ1ksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdEVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50XCI7XG5cbmV4cG9ydCBjbGFzcyBDaGVja2JveCBpbXBsZW1lbnRzIEFic3RyYWN0RWxlbWVudCB7XG4gICAgcHVibGljIGlkOiBudW1iZXI7XG4gICAgcHVibGljIHZhbHVlOiBzdHJpbmc7XG4gICAgcHVibGljIGxhYmVsOiBzdHJpbmc7XG4gICAgcHVibGljIGhlbHBlcjogc3RyaW5nO1xuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XG4gICAgcHVibGljIG9wdGlvbnM6IEFycmF5PE9iamVjdD47XG4gICAgcHVibGljIGhhc0V2ZW50OiBib29sZWFuO1xuICAgIHB1YmxpYyBzaG91bGRTdWJtaXQ6IGJvb2xlYW47XG5cbiAgICByZW5kZXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGA8Q2hlY2tCb3ggaWQ9XCJgK3RoaXMuaWQrYFwiIHRleHQ9XCJgK3RoaXMudmFsdWUrYFwiIGNsYXNzPVwic2hvdWxkU3VibWl0XCIgY2hlY2tlZD1cImZhbHNlXCI+PC9DaGVja0JveD5gKTtcbiAgICAgICAgcmV0dXJuIGA8Q2hlY2tCb3ggaWQ9XCJgK3RoaXMuaWQrYFwiIHRleHQ9XCJgK3RoaXMudmFsdWUrYFwiIGNsYXNzPVwic2hvdWxkU3VibWl0XCIgY2hlY2tlZD1cImZhbHNlXCI+PC9DaGVja0JveD5gO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKC4uLm9wdGlvbnMpe1xuICAgICAgICBjb25zb2xlLmxvZygnQ2hlY2tCb3gnKTtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnNbMF07XG4gICAgICAgXG4gICAgICAgIHRoaXMuaWQgPSBvcHRpb25zWydJZCddO1xuICAgICAgICB0aGlzLnZhbHVlID0gb3B0aW9uc1snTGFiZWwnXTtcbiAgICAgICAgdGhpcy5sYWJlbCA9ICcnO1xuICAgICAgICB0aGlzLmhlbHBlciA9IG9wdGlvbnNbJ0hlbHBlciddO1xuICAgICAgICB0aGlzLnNob3VsZFN1Ym1pdD10cnVlO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgY2FtZXJhT3B0aW9uczogb3B0aW9uc1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgLy90aGlzLm9wdGlvbnMgPSBKU09OLnBhcnNlKG9wdGlvbnNbJ09wdGlvbnMnXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDaGVja0JveDEnKTtcbiAgICB9XG59Il19