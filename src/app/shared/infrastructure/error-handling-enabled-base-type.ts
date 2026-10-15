import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export abstract class ErrorHandlingEnabledBaseType {
  protected handleError<T>(error: HttpErrorResponse): Observable<T> {
    return throwError(() => error);
  }
}
