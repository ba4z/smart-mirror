import {Component} from 'angular2/core';
import {TrafficService} from 'app/traffic/traffic.service';


@Component({
  selector: 'traffic',
  templateUrl: 'app/traffic/traffic.html',
  providers: [TrafficService]
})

export class TrafficComponent implements OnInit {
    constructor(
        private _trafficService: TrafficService
    ) { }

    public cbcTraffic;
    public ccaTraffic;

    ngOnInit() {
        var that = this;
        this._trafficService.getTraffic("cbc").subscribe(
             res => this.cbcTraffic = res.rows[0].elements[0],
             error =>  console.error(error));

        setTimeout(function(){
            that._trafficService.getTraffic("cca").subscribe(
                res => that.ccaTraffic = res.rows[0].elements[0],
                error =>  console.error(error));
        }, 500);
    }


}