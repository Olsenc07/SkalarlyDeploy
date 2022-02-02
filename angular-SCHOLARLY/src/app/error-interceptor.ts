import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { throwError} from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(private dialog: MatDialog ){}
    intercept(reg: HttpRequest<any>, next: HttpHandler) {
        return next.handle(reg).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An unknown error occured!';
                if (error.error.message) {
                    errorMessage = error.error.message;
                }
                this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
                return throwError(error);
            })
        );
    }
}
