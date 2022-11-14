import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  // private _loggedIn = new BehaviorSubject<boolean>(false);
  // isLoggedIn = this._loggedIn.asObservable()
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  login(value: boolean) {
    this.isLoggedIn.next(value);

  }

  register() {

  }

  logout() {
    this.isLoggedIn.next(false);
  }


}
