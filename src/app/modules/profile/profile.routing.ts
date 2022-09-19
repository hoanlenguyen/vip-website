import { Route, RouterModule } from "@angular/router";
import { VIPProfileComponent } from "./profile.component";


export const routes: Route[] = [
    {
        path: '',
        component: VIPProfileComponent
    }
];

export const vipProfileRoutes = RouterModule.forChild(routes);