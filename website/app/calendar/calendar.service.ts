import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Injectable()
export class CalendarService {

    constructor(private http: Http) {}

    public traffic = null;

    getCalendar() {
        var that = this;
        var url = "http://localhost:1337/calendar/";
        return this.http.get(url)
            .map(res => {
                var data = res.json();
                return that.parseCalendar(data, that).slice(0,6);
            })
            .catch(this.handleError);
    }

    private parseCalendar(data, that){
        if(data instanceof Array){
            var items = [];
            for(var index in data){
                var cal = ICAL.parse(data[index]);
                var comp = new ICAL.Component(cal);
                var vevents = comp.getAllSubcomponents("vevent");
                var time = new ICAL.Time.fromJSDate(new Date());
                var offsetHours = 0;

                var timezoneComp = comp.getFirstSubcomponent('vtimezone');
                var daylight = timezoneComp.getFirstSubcomponent('daylight');
                var standard = timezoneComp.getFirstSubcomponent('standard');
                var offsetTo = standard.getFirstPropertyValue('tzoffsetto');
                var offsetFrom = standard.getFirstPropertyValue('tzoffsetfrom');

                var daylightStart = moment(daylight.getFirstPropertyValue('dtstart').toJSDate());
                var standardStart = moment(standard.getFirstPropertyValue('dtstart').toJSDate());

                daylightStart.year(moment().year());
                standardStart.year(moment().year());

                var now = moment();
                if(now > daylightStart  && now < standardStart){
                    //in daylight savings
                    offsetHours = offsetFrom.hours * offsetFrom.factor;
                } else if (now > daylightStart  && now > standardStart || now < daylightStart  && now < standardStart){
                    //standard
                    offsetHours = offsetTo.hours * offsetTo.factor;
                }

                for (var i = 0, j = vevents.length; i < j; i++) {
                    var e = new ICAL.Event(vevents[i]);
                    var calendarItem, localOffset;
                    if (e.isRecurring()) {
                        try {
                            var recurringEvents = e.iterator(e.startDate);
                            var recurringEventsEndDate = e.iterator(e.endDate);
                        } catch (err){
                            console.error(err); //had issues with this in the past
                            continue;
                        }

                        localOffset = offsetHours;
                        if (e.startDate.timezone) {
                            localOffset = 0;
                        }
                        var go = 0;
                        var recurringTimes = 5; //default amount of repeating events
                        var next;
                        if(e.getRecurrenceTypes()["YEARLY"]) {
                            recurringTimes = 1;
                        }

                        while (go < recurringTimes && (next = recurringEvents.next())) {
                            if (next.toJSDate() > new Date()) {
                                var originalStartDate = e.startDate;

                                next.year = next.year;
                                next.hour = e.startDate.hour + localOffset;
                                next.minute = e.startDate.minute;
                                next.second = e.startDate.second;
                                e.startDate = next;

                                calendarItem = that.parseVeventItem(e);
                                if (calendarItem.pubdate > new Date()) {
                                    if(calendarItem.allDay){
                                        originalStartDate.year = next.year;
                                        originalStartDate.month = next.month;
                                        originalStartDate.day = next.day;
                                        e.startDate = originalStartDate;
                                    }
                                    calendarItem = that.parseVeventItem(e);
                                    var nextEndDate;
                                    while (nextEndDate = recurringEventsEndDate.next()) {
                                        if (nextEndDate.toJSDate() > new Date()) {
                                            nextEndDate.hour = e.endDate.hour + localOffset;
                                            nextEndDate.minute = e.endDate.minute;
                                            nextEndDate.second = e.endDate.second;
                                            e.endDate = nextEndDate;
                                            calendarItem = that.parseVeventItem(e);
                                            break;
                                        }
                                    }
                                    items.push(calendarItem);
                                }
                                go++;
                            }
                        }
                    } else {
                        calendarItem = that.parseVeventItem(e);
                        if (calendarItem.pubdate > new Date()) {
                            localOffset = offsetHours;
                            if (e.startDate.timezone && e.startDate.timezone != "Z" || calendarItem.allDay) {
                                localOffset = 0;
                            }
                            var startDate = moment(calendarItem.pubdate);
                            startDate.hours(startDate.hours() + localOffset);
                            calendarItem.pubdate = startDate.toDate();

                            var endDate = moment(calendarItem.endDate);
                            endDate.hours(endDate.hours() + localOffset);
                            calendarItem.endDate = endDate.toDate();
                            items.push(calendarItem);
                        }
                    }
                }
                var date_sort_asc = function(item1, item2) {
                    if (item1.pubdate > item2.pubdate) return 1;
                    if (item1.pubdate < item2.pubdate) return -1;
                    return 0;
                };
                items.sort(date_sort_asc);
            }
            return items;
        }
    }

    private parseVeventItem(e) {
        if (e.description && e.description !== "") {
            e.description.replace(/\\/g, "");
        }
        var allDay = false;
        if (e.startDate.hour === 0 && e.startDate.hour == e.endDate.hour) {
            allDay = true;
        }

        var image = "";
        var url = "";
        if(e.component.jCal[1]){
            for(var index in e.component.jCal[1]){
                if(e.component.jCal[1][index][0] == "attach"){
                    image = e.component.jCal[1][index][3];
                } else if(e.component.jCal[1][index][0] == "url")
                    url = e.component.jCal[1][index][3];
            }
        }

        var ev = {
            pubdate: new Date(e.startDate.year, e.startDate.month - 1, e.startDate.day, e.startDate.hour, e.startDate.minute, e.startDate.second),
            endDate: new Date(e.endDate.year, e.endDate.month - 1, e.endDate.day, e.endDate.hour, e.endDate.minute, e.endDate.second),
            title: e.summary,
            allDay: allDay,
            description: e.description,
            summary: e.location,
            image: { url: image },
            location: e.location ? e.location : "",
            link: url
        };
        if (ev.url) {
            ev.socialUrl = ev.link;
        }

        if(ev.allDay){
            ev.endDate = new Date(e.endDate.year, e.endDate.month - 1, e.endDate.day, e.endDate.hour, e.endDate.minute, e.endDate.second -1);
        }
        return ev;
    }

    private handleError (error: Response) {
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error');
    }

}