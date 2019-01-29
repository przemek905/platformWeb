import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {RegistrationTokenComponent} from "./registration-token/registration-token.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {UpdatePasswordComponent} from "./update-password/update-password.component";
import {RememberMeGuard} from "./_guards/remember-me.guard";
import {UserSettingsComponent} from "./user-settings/user-settings.component";

const appRoutes: Routes = [
    {
        path: 'pplatform',
        component: null,
        children: [
            {path: '', component: HomeComponent, canActivate: [AuthGuard] },
            {path: 'userSettings', component: UserSettingsComponent, canActivate: [AuthGuard] },
            {path: 'login', component: LoginComponent, canActivate: [RememberMeGuard] },
            {path: 'register', component: RegisterComponent},
            {path: 'registrationConfirm', component: RegistrationTokenComponent},
            {path: 'resetPassword', component: ResetPasswordComponent},
            {path: 'updatePassword', component: UpdatePasswordComponent },

        ]},
        // otherwise redirect to home
    {path: '**', redirectTo: 'pplatform'}

];

export const routing = RouterModule.forRoot(appRoutes);