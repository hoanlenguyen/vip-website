import { Route, RouterModule } from "@angular/router";
import { VIPHomeComponent } from "./home.component";


export const routes: Route[] = [
    {
        path: '',
        component: VIPHomeComponent
    }
];

export const vipHomeRoutes = RouterModule.forChild(routes);