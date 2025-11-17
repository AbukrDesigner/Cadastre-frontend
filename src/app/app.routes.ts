import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'frontoffice',
        pathMatch: 'full'
    },
    {
        path:'auth',
        loadChildren: () => import('./auth/auth.routes').then(
                m =>m.AUTH_ROUTES
            )
    },
    {
        path:'frontoffice',
        loadChildren:() =>import('./frontoffice/frontoffice.routes').then(
            m =>m.FRONTOFFICE_ROUTES
        )
    },
    {
        path: 'backoffice',
        loadChildren: () => import('./backoffice/backoffice.routes').then(
            m => m.BACKOFFICE_ROUTES
        )
    }
];
