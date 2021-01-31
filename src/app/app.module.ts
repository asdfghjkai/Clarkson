import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { VehicleEditComponent } from './components/vehicle-edit/vehicle-edit.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDeleteComponent } from './components/admin/admin-delete.component';
import { AdminClearComponent } from './components/admin/admin-clear.component';
import { FuelListComponent } from './components/fuel-list/fuel-list.component';
import { FillUpsComponent } from './components/fill-ups/fill-ups.component';
import { FuelLogEditComponent } from './components/fuel-log-edit/fuel-log-edit.component';
import { ConsumptionComponent } from './components/dashboard/charts/consumption/consumption.component';
import { MonthlyFuelCostsComponent } from './components/dashboard/charts/monthly-fuel-costs/monthly-fuel-costs.component';

import { VehicleService } from './services/vehicle.service';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UnitService } from './services/unit.service';
import { FuelService } from './services/fuel.service';
import { DashboardService } from './services/dashboard.service';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { RegistrationGuard } from './guards/registration.guard';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { UnauthorisedResponseInterceptor } from './interceptors/unauthorised-response.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        VehiclesComponent,
        LoginComponent,
        DashboardComponent,
        ConsumptionComponent,
        MonthlyFuelCostsComponent,
        NavComponent,
        PageNotFoundComponent,
        RegisterComponent,
        VehicleEditComponent,
        SettingsComponent,
        AdminComponent,
        AdminDeleteComponent,
        AdminClearComponent,
        FuelListComponent,
        FillUpsComponent,
        FuelLogEditComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ChartsModule,
        CommonModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
    providers: [
        VehicleService,
        ApiService,
        AuthService,
        UserService,
        UnitService,
        FuelService,
        DashboardService,
        AuthGuard,
        AdminGuard,
        RegistrationGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UnauthorisedResponseInterceptor,
            multi: true
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
