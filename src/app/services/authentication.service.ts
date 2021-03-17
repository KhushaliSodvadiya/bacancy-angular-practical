import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../schemas/user.schema';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<any>;
    public user: Observable<User>;

    constructor(private http: HttpClient) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(payload: any) {
        return this.http.post<User>(`${environment.apiUrl}/api/login`, payload)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.token));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        localStorage.removeItem('registeredUser');
        this.userSubject.next(null);
    }

    register(payload: any) {
        return this.http.post(`${environment.apiUrl}/api/register`, payload);
    }

    getUserById(id: any) {
        return this.http.get(`${environment.apiUrl}/api/users/${id}`);
    }
}