import { Route, RouterModule } from "@angular/router";

export const routes: Route[] = [
    {
        path: '',
        loadChildren: () => import('@app-core/layout/layout.module').then((m) => m.VIPLayoutModule)
    },
    {
        path: 'not-auth',
        loadChildren: () => import('@app-core/not-auth/not-auth.module').then((m) => m.VIPNotAuthModule)
    }
];

export const vipCoreRoutes = RouterModule.forRoot(routes, {anchorScrolling: "enabled"});