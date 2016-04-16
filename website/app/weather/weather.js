System.register(['angular2/core', 'app/weather/weather.service'], function(exports_1, context_1) {
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
    var core_1, weather_service_1;
    var WeatherComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (weather_service_1_1) {
                weather_service_1 = weather_service_1_1;
            }],
        execute: function() {
            WeatherComponent = (function () {
                function WeatherComponent(_weatherService) {
                    this._weatherService = _weatherService;
                }
                WeatherComponent.prototype.getWeather = function () {
                    var _this = this;
                    this._weatherService.getWeather().subscribe(function (res) { return _this.weather = res; }, function (error) { return console.error(error); });
                };
                WeatherComponent.prototype.getForecast = function () {
                    var _this = this;
                    this._weatherService.getForecast().subscribe(function (res) { return _this.forecast = res; }, function (error) { return console.error(error); });
                };
                WeatherComponent.prototype.displayDate = function (item) {
                    var date = moment.unix(item);
                    return date.format("dddd");
                };
                WeatherComponent.prototype.ngOnInit = function () {
                    var interval = 3600000; //one hour
                    var that = this;
                    that.getForecast();
                    setInterval(function () {
                        console.log("Getting forecast");
                        that.getForecast();
                    }, interval);
                    setTimeout(function () {
                        that.getWeather();
                        setInterval(function () {
                            console.log("Getting weather");
                            that.getWeather();
                        }, interval);
                    }, 1000);
                    this.iconTable = {
                        '01d': 'wi-day-sunny',
                        '02d': 'wi-day-cloudy',
                        '03d': 'wi-cloudy',
                        '04d': 'wi-cloudy-windy',
                        '09d': 'wi-showers',
                        '10d': 'wi-rain',
                        '11d': 'wi-thunderstorm',
                        '13d': 'wi-snow',
                        '50d': 'wi-fog',
                        '01n': 'wi-night-clear',
                        '02n': 'wi-night-cloudy',
                        '03n': 'wi-night-cloudy',
                        '04n': 'wi-night-cloudy',
                        '09n': 'wi-night-showers',
                        '10n': 'wi-night-rain',
                        '11n': 'wi-night-thunderstorm',
                        '13n': 'wi-night-snow',
                        '50n': 'wi-night-alt-cloudy-windy'
                    };
                };
                WeatherComponent = __decorate([
                    core_1.Component({
                        selector: 'weather',
                        templateUrl: 'app/weather/weather.html',
                        providers: [weather_service_1.WeatherService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof weather_service_1.WeatherService !== 'undefined' && weather_service_1.WeatherService) === 'function' && _a) || Object])
                ], WeatherComponent);
                return WeatherComponent;
                var _a;
            }());
            exports_1("WeatherComponent", WeatherComponent);
        }
    }
});
//# sourceMappingURL=weather.js.map