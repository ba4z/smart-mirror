import {Component} from 'angular2/core';
import {TrafficComponent} from 'app/traffic/traffic';
import {WeatherComponent} from 'app/weather/weather';
import {CalendarComponent} from 'app/calendar/calendar';

@Component({
    selector: 'my-app',
    templateUrl: 'app/main.html',
    directives: [TrafficComponent, WeatherComponent, CalendarComponent],
    styleUrls:  ['app/main.css']
})


export class AppComponent {
    var something = "nothing";
    console.log("init app");

}