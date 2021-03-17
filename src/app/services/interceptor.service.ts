import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent,HttpHandler,HttpInterceptor,HttpParams,HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
    private AUTH_HEADER = 'authorization';

    constructor(private router: Router, public auth: AuthenticationService,) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const newParams = new HttpParams({ fromString: req.params.toString() });
        if (!req.headers.has('Content-Type')) {
            req = req.clone({
                body: req.body,
                params: newParams,
            });
        }

        req = this.addAuthenticationToken(req);

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error && error.status === 403) {
                    this.router.navigate(['/']);
                    return throwError(error);
                }

                if (error && error.status === 503) {
                    this.router.navigate(['/auth/login']);
                }
                if (error && error.status === 401) {
                    this.router.navigate(['/auth/login']);

                    return throwError(error);
                } else {
                    return throwError(error);
                }
            })
        );
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        const user = this.auth.userValue;
        console.log("user",user);
        
        return request.clone({
            headers: request.headers.set(this.AUTH_HEADER, 'bearer ' + user),
        });
    }
}
