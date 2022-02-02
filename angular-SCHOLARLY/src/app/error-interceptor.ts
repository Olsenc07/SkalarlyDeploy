import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { throwError} from 'rxjs';




export class ErrorInterceptor implements HttpInterceptor{
    
    intercept(reg: HttpRequest<any>, next: HttpHandler) {
        return next.handle(reg).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                alert(error.error.message);
                return throwError(error);
            })
        );
    }
}
