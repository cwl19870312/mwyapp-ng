import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { NetService } from './net.service';

@Injectable()
export abstract class DetailService<T> {

    id: any;
    temp: T;

    constructor(
        protected _net: NetService
    ){}

    getItem(id:any):Observable<T>{
        return Observable.create(observer => {
            if(this.temp && this.id == id){
                observer.next(this.temp);
                observer.complete();
            }else{
                this.getItemObservable(id).subscribe(
                    item => {
                        this.temp = item;
                        this.id = id;
                        observer.next(this.temp);
                        observer.complete();
                    },
                    error => {
                        observer.error(error);
                        observer.complete();
                    }
                )
            }
        })
    }

    protected abstract getItemObservable(id:any):Observable<T>
}