import { Route, RouterModule } from "@angular/router";
import { VIPLoginComponent } from "./login.component";

export const routes: Route[] = [
    {
        path: '',
        component: VIPLoginComponent
    }
];

export const vipLoginRoutes = RouterModule.forChild(routes);