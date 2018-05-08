import { Injectable } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class NetService {

    constructor(
        protected _http: Http
    ) { }

    protected extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    protected handleError = (error: any) => {

        if (error.status == 0) {
            return Observable.throw("网络错误，请稍后尝试");
        }
        if (error.status == 500) {
            return Observable.throw("网络错误，请稍后尝试(code:500)");
        }
        if (error.status == 404) {
            return Observable.throw("没有您要找的信息");
        }
        let errors = error.json();
        let errorMsg = "";
        for (let e in errors) {
            errorMsg += errors[e] + "  ";
        }
        return Observable.throw(errorMsg);
    }

    doGet(url, search?: URLSearchParams): Observable<any> {
        let options = this.getOptions(search);
        return this._http.get(url, options).pipe(
            map(this.extractData),
            catchError((error) => of(this.handleError))
        )
    }

    doPost(url, body = null, search?: URLSearchParams): Observable<any> {
        if (body) body = JSON.stringify(body);
        let options = this.getOptions(search);
        return this._http.post(url, body, options).pipe(
            map(this.extractData),
            catchError((error)=>of(this.handleError))
        )
    }

    doPut(url, body = null, search?: URLSearchParams): Observable<any> {
        if (body) body = JSON.stringify(body);
        let options = this.getOptions(search);
        return this._http.put(url, body, options).pipe(
            map(this.extractData),
            catchError((error)=>of(this.handleError))
        )
    }

    protected getOptions(search?: URLSearchParams):RequestOptions{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, search: search });
        return options;
    }

}