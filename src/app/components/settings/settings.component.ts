import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UnitService } from '../../services/unit.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

import { UserPreferences, Unit, CurrencyUnit } from '../../model/user-preferences';
import { User } from '../../model/user';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

    public userPreferencesForm: FormGroup;
    public userPreferences: UserPreferences;
    public userId: string;
    public user: User;

    public fuelUnits: Unit[];
    public fuelConsumptionUnits: Unit[];
    public distanceUnits: Unit[];
    public currencyUnits: CurrencyUnit[];

    public preferencesUpdateSuccess: boolean;
    public preferencesUpdateFailure: boolean;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private unitService: UnitService,
        private userService: UserService, private router: Router, private toastr: ToastrService) {

        this.userPreferencesForm = formBuilder.group({

            'fuelUnit': [null, Validators.required],
            'fuelConsumptionUnit': [null, Validators.required],
            'distanceUnit': [null, Validators.required],
            'currencyUnit': [null, Validators.required]
        });
    }

    ngOnInit() {

        this.userService.getUser().subscribe(data => {

            this.user = data.user;
            this.userId = data.user.id;
            this.userPreferences = data.user.preferences;
        });

        this.unitService.getFuelUnits().subscribe(data => {
            this.fuelUnits = data.fuelUnits;
        });

        this.unitService.getFuelConsumptionUnits().subscribe(data => {
            this.fuelConsumptionUnits = data.fuelConsumptionUnits;
        });

        this.unitService.getDistanceUnits().subscribe(data => {
            this.distanceUnits = data.distanceUnits;
        });

        this.unitService.getCurrencyUnits().subscribe(data => {
            this.currencyUnits = data.currencyUnits;
        });
    }

    public savePreferences() {

        this.userService.updateUserPreferences(this.userId, this.userPreferences).subscribe(

            data => {
                this.toastr.success('Settings updated.');
            },
            err => {
                this.toastr.error('Unable to update settings.');
            }
        );
    }

    public removeUser() {

        this.authService.logOut();
        this.router.navigate(['/login']);
    }

    public clearUser(userId: string) {
        console.log("User data cleared for " + userId);
    }
}
