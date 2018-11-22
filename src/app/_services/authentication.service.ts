import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

     httpOptions:any = {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded'

            })
          };
    constructor(private http: HttpClient) {
       }



    login(username: number, password: string) {

        return this.http.post<any>('http://localhost:5000/RetailBanking_GroupB/user/login', { ssn: username, password: password },this.httpOptions)
            .map(user => {
                // login successful if there's a jwt token in the response
                console.log(user);
                if (user['status']) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user['data']));
                }

                return user;
            },
            error=>{
                console.error(error)
            }
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
