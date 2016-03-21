import {Component} from 'angular2/core';
import {WeatherObject} from 'app/weather/weatherObject';
import {ForecastObject} from 'app/weather/forecastObject';
import {WeatherService} from 'app/weather/weather.service';


@Component({
  selector: 'weather',
  templateUrl: 'app/weather/weather.html',
  providers: [WeatherService]
})

export class WeatherComponent implements OnInit {
    constructor(
        private _weatherService: WeatherService
    ) { }

    public weather: WeatherObject;
    public forecast: ForecastObject;
    public iconTable: any;

    getWeather() {
        this._weatherService.getWeather().subscribe(
             res => this.weather = res,
             error =>  console.error(error));
    }

    getForecast() {
        this._weatherService.getForecast().subscribe(
             res => this.forecast = res,
             error =>  console.error(error));
    }

    displayDate(item) {
        var date = moment.unix(item);
        return date.format("dddd");
    }

    ngOnInit() {
        var that = this;
        this.getForecast();

        setTimeout(function(){
            that.getWeather();
        }, 500);


        this.iconTable = {
            '01d':'wi-day-sunny',
            '02d':'wi-day-cloudy',
            '03d':'wi-cloudy',
            '04d':'wi-cloudy-windy',
            '09d':'wi-showers',
            '10d':'wi-rain',
            '11d':'wi-thunderstorm',
            '13d':'wi-snow',
            '50d':'wi-fog',
            '01n':'wi-night-clear',
            '02n':'wi-night-cloudy',
            '03n':'wi-night-cloudy',
            '04n':'wi-night-cloudy',
            '09n':'wi-night-showers',
            '10n':'wi-night-rain',
            '11n':'wi-night-thunderstorm',
            '13n':'wi-night-snow',
            '50n':'wi-night-alt-cloudy-windy'
        };

    }


}