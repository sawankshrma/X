import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Me } from './pages/me/me';
import { LoginPage } from './login-page/login-page';
import { SignupPage } from './signup-page/signup-page'

export const routes: Routes = [
    { path: 'login', component : LoginPage},
    { path: 'me', component: Me},
    { path: 'home', component: Home},
    { path: 'signup', component: SignupPage}

    // { path: 'completed', component : CompletedComponent },
];
