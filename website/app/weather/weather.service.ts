import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';


@Injectable()
export class WeatherService implements OnInit {

    constructor(private http: Http) {}

    public weather = null;

    getWeather() {
        var url = "http://localhost:1337/weather";

        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    };

    getForecast() {
        var url = "http://localhost:1337/forecast";

        return this.http.get(url)
                .map(res => res.json())
//                .do(data => console.log(data)) // eyeball results in the console
                .catch(this.handleError);
    };

    private handleError (error) {
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error');
    }

}