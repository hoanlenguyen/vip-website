import { Route, RouterModule } from "@angular/router";
import { VIPFirstTimeLoginComponent } from "./first-time-login.component";

export const routes: Route[] = [
    {
        path: '',
        component: VIPFirstTimeLoginComponent
    }
];

export const vipFirstTimeLoginRoutes = RouterModule.forChild(routes);