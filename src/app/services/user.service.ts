import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

import { AuthCredentials } from '../model/auth-credentials';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

import { User } from '../model/user';
import { UserPreferences } from '../model/user-preferences';

@Injectable()
export class UserService {

    constructor(private authService: AuthService, private apiService: ApiService) { }

    registerUser(user: User) {
        return this.apiService.registerUser(user);
    }

    getUser() {
        return this.apiService.getUser(this.authService.getUserId());
    }

    getAllUsers() {
        return this.apiService.getAllUsers().pipe(map(response => {

            response.users.sort((now, next) => {
                return now.username > next.username ? 1 : -1;
            });

            return response;
        }));
    }

    deleteUser(userId: string) {
        return this.apiService.deleteUser(userId);
    }

    clearUserData(userId: string) {
        return this.apiService.clearUserData(userId);
    }

    promoteUser(userId: string) {
        return this.apiService.promoteUser(userId);
    }

    demoteUser(userId: string) {
        return this.apiService.demoteUser(userId);
    }

    updateUserPreferences(userId: string, userPreferences: UserPreferences) {
        return this.apiService.updateUserPreferences(userId, userPreferences);
    }
}
