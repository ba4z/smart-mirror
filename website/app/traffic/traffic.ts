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

    getCBCTraffic() {
        var that = this;
        this._trafficService.getTraffic("cbc").subscribe(
             res => this.cbcTraffic = res.rows[0].elements[0],
             error =>  console.error(error));
    }

    getCCATraffic() {
        var that = this;
        this._trafficService.getTraffic("cca").subscribe(
            res => that.ccaTraffic = res.rows[0].elements[0],
            error =>  console.error(error));
    }

    ngOnInit() {
        var interval = 3600000 //one hour
        var that = this;

        this.getCBCTraffic();
        setInterval(function() {
            that.getCBCTraffic();
        }, interval);


        var that = this;
        setTimeout(function(){
            that.getCCATraffic();
            setInterval(function() {
                that.getCCATraffic();
            }, interval);
        }, 500);


    }


}