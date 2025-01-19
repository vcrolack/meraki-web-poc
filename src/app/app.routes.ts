import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        data: { section: 'Users' },
        children: [
          {
            path: '',
            data: { section: 'Users' },
            loadComponent: () =>
              import('./features/users/pages/users/users.component').then(
                (m) => m.UsersComponent
              ),
          },
          {
            path: 'create',
            data: { section: 'Create user' },
            loadComponent: () =>
              import(
                './features/users/pages/create-user/create-user.component'
              ).then((m) => m.CreateUserComponent),
          },
          {
            path: ':id',
            data: { section: 'Edit user' },
            loadComponent: () =>
              import(
                './features/users/pages/edit-user/edit-user.component'
              ).then((m) => m.EditUserComponent),
          },
        ],
      },
      {
        path: 'lists',
        data: { section: 'Lists' },
        loadComponent: () =>
          import('./features/lists/pages/lists/lists.component').then(
            (m) => m.ListsComponent
          ),
      },
    ],
  },
];
