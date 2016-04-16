import {Component} from 'angular2/core';
import {CalendarService} from 'app/calendar/calendar.service';

@Component({
  selector: 'calendar',
  templateUrl: 'app/calendar/calendar.html',
  providers: [CalendarService]
})

export class CalendarComponent implements OnInit {
    constructor(
        private _calendarService: CalendarService
    ) { }

    public calendarItems;

    ngOnInit() {
        var interval = 3600000 //one hour
        this.getCalendar();

        var that = this;
        setInterval(function() {
            that.getCalendar();
        }, interval);
    }

    getCalendar() {
        this._calendarService.getCalendar().subscribe(
             res => this.calendarItems = res,
             error =>  console.error(error));
    }


}