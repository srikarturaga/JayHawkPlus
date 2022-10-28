import { Component } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventSettingsModel } from '@syncfusion/ej2-angular-schedule';

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
