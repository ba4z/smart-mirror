System.register(['angular2/core', 'app/traffic/traffic', 'app/weather/weather', 'app/calendar/calendar'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, traffic_1, weather_1, calendar_1;
    var AppComponent, something;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (traffic_1_1) {
                traffic_1 = traffic_1_1;
            },
            function (weather_1_1) {
                weather_1 = weather_1_1;
            },
            function (calendar_1_1) {
                calendar_1 = calendar_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/main.html',
                        directives: [traffic_1.TrafficComponent, weather_1.WeatherComponent, calendar_1.CalendarComponent],
                        styleUrls: ['app/main.css']
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
            something = "nothing";
            console.log("init app");
        }
    }
});
//# sourceMappingURL=app.component.js.map