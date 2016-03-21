import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Injectable()
export class TrafficService {

    constructor(private http: Http) {}

    public traffic = null;

    getTraffic(location) {
        var url = "http://localhost:1337/traffic/" + location;

        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError (error: Response) {
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error');
    }

}