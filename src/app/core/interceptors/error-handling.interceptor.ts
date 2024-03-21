import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  let isLocalStorageAvailable = typeof localStorage !== 'undefined';
  let authToken;
  if(isLocalStorageAvailable){
    authToken = localStorage.getItem('token');
  }
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.error('Unauthorized request:', err);
        } else {
          console.error('HTTP error:', err);
        }
      } else {
        console.error('An error occurred:', err);
      }
      return throwError(() => err); 
    })
  );
};