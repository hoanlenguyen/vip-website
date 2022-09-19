import { Route, RouterModule } from "@angular/router";
import { VIPNotAuthComponent } from "./not-auth.component";

export const routes: Route[] = [
    {
        path: '',
        component: VIPNotAuthComponent,
    }
];

export const vipNotAuthRoutes = RouterModule.forChild(routes);