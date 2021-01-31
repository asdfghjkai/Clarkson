import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef
} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

import { User } from '../../model/user';

@Component({
    selector: 'app-admin-delete',
    templateUrl: './admin-delete.component.html'
})
export class AdminDeleteComponent implements OnInit {

    @Input()
    public user: User;

    @ViewChild('closeAdminDeleteModal')
    public closeAdminDeleteModal: ElementRef;

    @Output()
    public deleteSuccess: EventEmitter<string> = new EventEmitter();

    constructor(private userService: UserService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.user = new User();
    }

    public closeModal() {
        this.closeAdminDeleteModal.nativeElement.click();
    }

    public delete() {

        this.userService.deleteUser(this.user.id).subscribe(

            data => {

                this.closeModal();
                this.deleteSuccess.emit(this.user.id);
                this.toastr.success('User deleted.');
            },

            err => {
                this.showErrorMessage(err);
            }
        );
    }

    public showErrorMessage(error: any) {
        this.toastr.error('Error while deleting user. Reason: ' + error);
    }
}
