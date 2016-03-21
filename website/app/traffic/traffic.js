System.register(['angular2/core', 'app/traffic/traffic.service'], function(exports_1, context_1) {
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
    var core_1, traffic_service_1;
    var TrafficComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (traffic_service_1_1) {
                traffic_service_1 = traffic_service_1_1;
            }],
        execute: function() {
            TrafficComponent = (function () {
                function TrafficComponent(_trafficService) {
                    this._trafficService = _trafficService;
                }
                TrafficComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var that = this;
                    this._trafficService.getTraffic("cbc").subscribe(function (res) { return _this.cbcTraffic = res.rows[0].elements[0]; }, function (error) { return console.error(error); });
                    setTimeout(function () {
                        that._trafficService.getTraffic("cca").subscribe(function (res) { return that.ccaTraffic = res.rows[0].elements[0]; }, function (error) { return console.error(error); });
                    }, 500);
                };
                TrafficComponent = __decorate([
                    core_1.Component({
                        selector: 'traffic',
                        templateUrl: 'app/traffic/traffic.html',
                        providers: [traffic_service_1.TrafficService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof traffic_service_1.TrafficService !== 'undefined' && traffic_service_1.TrafficService) === 'function' && _a) || Object])
                ], TrafficComponent);
                return TrafficComponent;
                var _a;
            }());
            exports_1("TrafficComponent", TrafficComponent);
        }
    }
});
//# sourceMappingURL=traffic.js.map