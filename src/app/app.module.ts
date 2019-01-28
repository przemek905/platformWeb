import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { RegistrationTokenComponent } from './registration-token/registration-token.component';
import { MainComponent } from './main/main.component';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService} from "ngx-logger";
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import {HomeService} from "./_services/home.service";
import {RememberMeGuard} from "./_guards/remember-me.guard";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR})
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        RegistrationTokenComponent,
        MainComponent,
        ResetPasswordComponent,
        UpdatePasswordComponent
    ],
    providers: [
        AuthGuard,
        RememberMeGuard,
        AlertService,
        AuthenticationService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        NGXLogger,
        NGXLoggerHttpService,
        LoggerConfig,
        HomeService

    ],
    bootstrap: [AppComponent]
})

export class AppModule { }