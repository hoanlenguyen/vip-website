import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { tap, withLatestFrom } from "rxjs";
import { HomeState } from "./home.state";

@Injectable()
export class VIPHomeStore extends ComponentStore<HomeState> {

    readonly categoryIds$ = this.select((state) => state.categoryIds);

    readonly vm$ = this.select(
        this.categoryIds$,
        ( categoryIds ) => ({ categoryIds })
    )

    constructor() {
        super(initializeState)
    }

    updateCategoryIdsEffect = this.effect<number>((trigger$) => 
        trigger$.pipe(
            //TO DO: For Scale
            withLatestFrom(this.categoryIds$),
            tap(([id, categoryIds]) => this.patchState({ categoryIds: [id] })
        ))
    );

}

const initializeState: HomeState = {
    categoryIds: [],
}