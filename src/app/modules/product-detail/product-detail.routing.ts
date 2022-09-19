import { Route, RouterModule } from "@angular/router";
import { VIPProductDetailComponent } from "./product-detail.component";


export const routes: Route[] = [
    {
        path: '',
        component: VIPProductDetailComponent
    }
];

export const vipProductDetailRoutes = RouterModule.forChild(routes);