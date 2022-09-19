import { Route, RouterModule } from "@angular/router";
import { VIPAuthGuard, VIPNonAuthGuard } from "@app-core/guards";
import { VIPLayoutComponent } from "./layout.component";

export const routes: Route[] = [
    {
        path: '',
        component: VIPLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'home',
                canActivate: [VIPAuthGuard],
                canLoad: [VIPAuthGuard],
                loadChildren: () => import('@app-modules/home/home.module').then((m) => m.VIPHomeModule)
            },
            {
                path: 'product/:id',
                canActivate: [VIPAuthGuard],
                canLoad: [VIPAuthGuard],
                loadChildren: () => import('@app-modules/product-detail/product-detail.module').then((m) => m.VIPProductDetailModule)
            },
            {
                path: 'login',
                canActivate: [VIPNonAuthGuard],
                canLoad: [VIPNonAuthGuard],
                loadChildren: () => import('@app-modules/login/login.module').then((m) => m.VIPLoginModule)
            },
            {
                path: 'first-time-login',
                canActivate: [VIPNonAuthGuard],
                canLoad: [VIPNonAuthGuard],
                loadChildren: () => import('@app-modules/first-time-login/first-time-login.module').then((m) => m.VIPFirstTimeLoginModule)
            },
            {
                path: 'forget-password',
                canActivate: [VIPNonAuthGuard],
                canLoad: [VIPNonAuthGuard],
                loadChildren: () => import('@app-modules/forget-password/forget-password.module').then((m) => m.VIPForgetPasswordModule)
            },
            {
                path: 'profile',
                canActivate: [VIPAuthGuard],
                canLoad: [VIPAuthGuard],
                loadChildren: () => import('@app-modules/profile/profile.module').then((m) => m.VIPProfileModule)
            },
            {
                path: 'shopping-cart',
                canActivate: [VIPAuthGuard],
                canLoad: [VIPAuthGuard],
                loadChildren: () => import('@app-modules/shopping-cart/shopping-cart.module').then((m) => m.VIPShoppingCartModule)
            },
            {
                path: 'checkout',
                canActivate: [VIPAuthGuard],
                canLoad: [VIPAuthGuard],
                loadChildren: () => import('@app-modules/checkout/checkout.module').then((m) => m.VIPCheckoutModule)
            }
        ]
    }
];

export const vipLayoutRoutes = RouterModule.forChild(routes);