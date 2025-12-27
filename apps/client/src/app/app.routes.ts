import { Route } from '@angular/router';
import { LayoutComponent } from '@poc/shared/ui';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@poc/feature/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'operations',
        loadComponent: () => import('@poc/feature/operations').then(m => m.OperationsComponent)
      },
      {
        path: 'details/:id',
        loadComponent: () => import('@poc/feature/details').then(m => m.DetailsComponent)
      }
    ]
  }
];
