import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { HeaderImagesState } from './header-images.state';

@Injectable({
    providedIn: 'root'
})
export class VIPHeaderImagesStoreService extends ComponentStore<HeaderImagesState>{
    constructor() {
        super(initialHeaderImagesState);
    }

    readonly headerImages$ = this.select((state) => state.headerImages);

    readonly vm$ = this.select(
        this.headerImages$,
        (headerImages) => ({ headerImages})
    );

    setStateValue<T extends Partial<HeaderImagesState>>(state: T) {
        this.patchState({ ...state });
    }
}

export const initialHeaderImagesState: HeaderImagesState = {
    headerImages: [{
        title: 'Lorem ipsum dolor sit amet consectetur.',
        url: 'https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ratione nostrum incidunt dolores excepturi doloribus error obcaecati voluptatum distinctio similique nihil.
            Tenetur illum delectus expedita tempora exercitationem hic a maxime quibusdam!`
    },
    {
        title: 'Lorem ipsum dolor sit amet consectetur.1',
        url: 'https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ratione nostrum incidunt dolores excepturi doloribus error obcaecati voluptatum distinctio similique nihil.
            Tenetur illum delectus expedita tempora exercitationem hic a maxime quibusdam!`
    }]
};