import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';



@Injectable()
export class UnauthorisedResponseInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(tap(

            (event: HttpEvent<any>) => { },
            (err: any) => {

                if (err instanceof HttpErrorResponse) {

                    if (err.status === 401) {

                        localStorage.removeItem('token');
                        this.router.navigate([ '/login' ]);
                    }
                }
            }
        ));
    }
}
