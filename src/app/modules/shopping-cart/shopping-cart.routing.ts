import { Route, RouterModule } from "@angular/router";
import { VIPShoppingCartComponent } from "./shopping-cart.component";


export const routes: Route[] = [
    {
        path: '',
        component: VIPShoppingCartComponent
    }
];

export const vipShoppingCartRoutes = RouterModule.forChild(routes);