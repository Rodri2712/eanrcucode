import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { PageNotFound } from './shared/presentation/views/page-not-found/page-not-found';
import { ServiceOrders } from './maintenance/presentation/views/service-orders/service-orders';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'maintenance/service-orders',
    component: ServiceOrders,
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
