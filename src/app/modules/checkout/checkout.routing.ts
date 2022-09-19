import { Route, RouterModule } from "@angular/router";
import { VIPCheckoutComponent } from "./checkout.component";


export const routes: Route[] = [
    {
        path: '',
        component: VIPCheckoutComponent
    }
];

export const vipCheckoutRoutes = RouterModule.forChild(routes);