import { Component, ViewChild } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventSettingsModel, ScheduleComponent, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  showError: boolean = false;
  private unsubscriber: Subject<void> = new Subject<void>();
  /*public eventData: EventSettingsModel = {
    dataSource: [{
      Id: 1,
      Subject: 'Board Meeting',
      StartTime: new Date(2018, 10, 30, 9, 0),
      EndTime: new Date(2018, 10, 30, 11, 0)
    },
    {
      Id: 2,
      Subject: 'Training session on JSP',
      StartTime: new Date(2018, 10, 30, 15, 0),
      EndTime: new Date(2018, 10, 30, 17, 0)
    },
    {
      Id: 3,
      Subject: 'Sprint Planning with Team members',
      StartTime: new Date(2018, 10, 30, 9, 30),
      EndTime: new Date(2018, 10, 30, 11, 0)
    }]
  }*/
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Subject: 'Meeting',
        StartTime: new Date(2022, 0, 3, 5, 0),
        EndTime: new Date(2022, 0, 3, 7, 0)
      },
      {
        Subject: 'Meeting2',
        StartTime: new Date(2022, 10, 5, 12, 0),
        EndTime: new Date(2022, 10, 5, 14, 0)
      }
    ]
  };

  @ViewChild("schedule", { static: false })
  public scheduleObj: ScheduleComponent;

  onPopupOpen(args) {
    console.log("popUp args", args.data);
    console.log("getEvent result", this.scheduleObj.getEvents(args.data));
  }

  onActionComplete(args: ActionEventArgs): void {
    console.log("actionComplete", args.requestType, args);
    console.log(this.eventSettings);

    switch (args.requestType) {
      case "viewNavigate":
      case "dateNavigate":
        this.scheduleObj.refresh();
        break;
      case "toolBarItemRendered":
        break;
      default:
    }
  }

  ngOnInit(): void {
    history.pushState(null, '');

    fromEvent(window, 'popstate').pipe(
      takeUntil(this.unsubscriber)
    ).subscribe((_) => {
      history.pushState(null, '');
      this.showError = true;
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
