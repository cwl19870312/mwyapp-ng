import { Observable, Observer, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NetService } from './net.service';
import { ToastService } from '../component/toast/toast.service';

@Injectable()
export abstract class ListService<T> {

    protected page: number = 1;
    protected next: boolean = true
    protected loading: boolean = false;

    protected list: Array<T> = [];

    protected errorTime: number = 0;

    protected readonly maxErrorTime: number = 5;

    protected sub: Subscription;

    constructor(
        protected _net: NetService,
        protected _toast: ToastService
    ) { }

    init() {
        this.page = 1;
        this.list = [];
        this.next = true;
        this.loading = false;
        if (this.sub) this.sub.unsubscribe();
    }

    getNext(): Observable<ListResult<T>> {
        return Observable.create(observer => {
            if (this.loading) {
                observer.error('正在加载中');
                observer.complete();
            } else if (!this.next) {
                observer.error('已经没有更多了');
                observer.complete();
            } else {
                this.getNextData(observer);
            }
        })
    }

    getList(): Array<T> {
        return this.list;
    }

    isNext(): boolean {
        return this.next;
    }

    private getNextData(observer: Observer<ListResult<T>>) {
        this.loading = true;
        this.sub = this.getNextObservable(this.page).pipe(
            map((data) => {
                this.errorTime = 0;
                this.list = this.list.concat(data.list);
                this.next = data.next;
                this.page++;
                this.loading = false;
                return { next: data.next, list: this.list, count: data.count };
            })
        ).subscribe((data) => {
            this.loading = false;
            observer.next(data);
            observer.complete();
        }, (error) => {
            this.errorTime++;
            this._toast.toast(error);
            this.loading = false;
            observer.error(error);
            observer.complete();
        })
    }

    protected abstract getNextObservable(page: number): Observable<ListResult<T>>

}

export interface ListResult<T> {
    next: boolean;
    list: Array<T>;
    count?: number;
}