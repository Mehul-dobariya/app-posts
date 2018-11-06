import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class DataService {

    // API BASE URL
    apiBaseURL = 'https://jsonplaceholder.typicode.com';

    // SERVICE CONSTRUCTOR
    constructor(private http:HttpClient) {
    }

    // GET API CALL
    get(data:any):Observable<any> {

        return this.http.request<any>('GET', this.apiBaseURL + data.url)
            .pipe(
            map(response => {
                return response;
            }),
            catchError(this.handleError)
        );
    }

    // POST API CALL USING PROMISE
    postUsingPromise(data:any) {
        return new Promise((resolve, reject) => {
            this.http.post(this.apiBaseURL + data.url, data.data)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    // PUT API CALL USING PROMISE
    putUsingPromise(data:any) {
        return new Promise((resolve, reject) => {
            this.http.put(this.apiBaseURL + data.url, data.data)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    // DELETE API CALL
    delete(data:any):Observable<any> {
        return this.http.delete(this.apiBaseURL + data.url)
            .pipe(
            map(response => {
                return response;
            }),
            catchError(this.handleError)
        );
    }

    // HANDEL API ERROR
    private handleError(error:HttpErrorResponse) {
        if (error instanceof HttpErrorResponse) {
            return throwError(error.error);
        }
    }

}
