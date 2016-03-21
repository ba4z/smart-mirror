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
        console.log("calendar inited");
        this.getCalendar();
    }

    getCalendar() {
        this._calendarService.getCalendar().subscribe(
             res => this.calendarItems = res,
             error =>  console.error(error));
    }


}