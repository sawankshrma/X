import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject, tap, catchError, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/enviornments';
import { loginParams, signupParams } from './Types/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly hostServer = environment.hostServer
  private readonly host = this.hostServer + '/api/v1'

  getLoggedInState () {
    return this.isLoggedIn.asObservable();
  }

  login (params: loginParams) {
    return this.http.post(this.host + '/signin', params, {withCredentials: true})
  }

  signup (params: signupParams) {
    return this.http.post(this.host + '/signup', params)
  }

  setLoggedIn(val: boolean) {
    this.isLoggedIn.next(val);
  }

  logout() {
    return this.http.post(this.host + '/logout', {}, {withCredentials: true})
  }

  checkAuth() {
  return this.http.get(this.host + '/me', { withCredentials: true }).pipe(
    tap(() => this.isLoggedIn.next(true)),
    catchError(() => {
      this.isLoggedIn.next(false);
      console.log(this.isLoggedIn)
      return of(null)
    })
  )
}


}
