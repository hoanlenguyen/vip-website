import { OnDestroy } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { VIPHeaderImagesStoreService } from './store/header-images.store';

@Component({
    selector: 'vip-header-images',
    templateUrl: './header-images.component.html',
    styleUrls: ['./header-images.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VIPHeaderImagesComponent implements OnInit, OnDestroy {
    readonly vm$ = this._store.vm$;
    constructor(private _store: VIPHeaderImagesStoreService) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    getStarted() {

    }
}
