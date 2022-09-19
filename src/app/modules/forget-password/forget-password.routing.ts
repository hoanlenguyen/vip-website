import { Route, RouterModule } from "@angular/router";
import { VIPForgetPasswordComponent } from "./forget-password.component";


export const routes: Route[] = [
    {
        path: '',
        component: VIPForgetPasswordComponent
    }
];

export const vipForgetPasswordRoutes = RouterModule.forChild(routes);