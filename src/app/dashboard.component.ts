import { Component,ChangeDetectorRef } from "@angular/core";
import ServiceHelper, { HttpOperation } from "./services/serviceHelper";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
    one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
    selector: 'dashboard-component',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

    searchText: string = "";
    contextFilter: string = "ALL";
    myusers: Array<string> = [];
    mydevices: Array<string> = [];
    userReportOut: Array<any>;
    statusIcon: string;
    statusMessage: string;

    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;

    constructor(private serviceHelper: ServiceHelper, calendar: NgbCalendar, private cdRef: ChangeDetectorRef) {
        this.fromDate = calendar.getPrev(calendar.getToday(), "d", 10);
        this.toDate = calendar.getToday();
        this.loadUserReport();
    }

    onDateChange(date: NgbDateStruct) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
            this.toDate = date;
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
    }

    loadUserReport() {
        var xoPuttyOnlyFilter = "{ context: /XO Putty/ }";
        var commandsOnlyFilter = "{ context: { $not: /XO Putty/ }}";
        var anyFilter = "{ context: /" + this.searchText + "/i }";


        var searchFilter = this.searchText.length > 0 ? "{ $match: {$or: [{ command_string: /" + this.searchText + "/i}," + anyFilter + "]}}" : "";

        if (searchFilter != "") {
            if (this.contextFilter == "puttyOnly")
                searchFilter += "," + "{ $match:" + xoPuttyOnlyFilter + "}";
            if (this.contextFilter == "commandsOnly")
                searchFilter += "," + "{ $match:" + commandsOnlyFilter + "}";
        }
        else {
            if (this.contextFilter == "puttyOnly")
                searchFilter += "{ $match:" + xoPuttyOnlyFilter + "}";
            if (this.contextFilter == "commandsOnly")
                searchFilter += "{ $match:" + commandsOnlyFilter + "}";
        }

        var userFilter = "";
        userFilter = this.myusers.length > 0 ? "{ $match: { username: { $in: ['" + this.myusers.join("', '") + "'] } } }" : "";


        var deviceFilter = this.mydevices.length > 0 ? "{ $match: { device_name: { $in: ['" + this.mydevices.join("', '") + "'] } } }" : "";
        var sortBy = "{ $sort: { timestamp: 1 } }";
        var datesFilter =
            "{ $match: { timestamp: { $gte: ISODate('" + new Date(2017, 11, 2).toISOString() + "')," +
            "$lt: ISODate('" + new Date(2017, 11, 6).toISOString() + "') } } }";

        var groupFilter = "{ $group: { _id: { timestamp: { day : { $dayOfMonth : '$timestamp' }," +
            "month : { $month : '$timestamp' }," +
            "year : { $year : '$timestamp' } }, " +
            "username: '$username', device: '$device_name', context:'$context'}, total: { $sum: 1 } } }";


        var mongoQuery = "[" + searchFilter + (searchFilter == "" ? "" : ",") +
            datesFilter + ","
            + sortBy +
            (userFilter == "" ? "" : ",") + userFilter +
            (deviceFilter == "" ? "" : ",") + deviceFilter +
            "," + groupFilter +
            "]";

        this.statusIcon = "fa fa-cog fa-spin";
        this.statusMessage = "Please wait..";

        this.serviceHelper.performAsyncInvocation(HttpOperation.GET, "/api/mongo/dcm/dcm_transactions",
            {
                queryMode: 'AGGREGATION',
                json: mongoQuery,
            }).then(data => {
                this.userReportOut = JSON.parse(data.content);
                this.statusIcon = "fa fa-check";
                this.statusMessage = "Success!";
                this.cdRef.detectChanges();
            },
            error => {               
                this.statusIcon = "fa fa-check";
                this.statusMessage = "Success!";
            }
        );
    }
}
