import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Me } from './pages/me/me';
import { LoginPage } from './login-page/login-page';

export const routes: Routes = [
    { path: 'login', component : LoginPage},
    { path: 'me', component: Me},
    { path: 'home', component: Home},


    // { path: 'completed', component : CompletedComponent },
];
