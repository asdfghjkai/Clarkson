import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    AfterViewChecked,
    ChangeDetectorRef,
    ViewChild,
    ElementRef
} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

import { User } from '../../model/user';

@Component({
    selector: 'app-admin-clear',
    templateUrl: './admin-clear.component.html'
})
export class AdminClearComponent implements OnInit {

    @Input()
    public user: User;

    @ViewChild('closeAdminClearModal')
    public closeAdminClearModal: ElementRef;

    @Output()
    public clearSuccess: EventEmitter<string> = new EventEmitter();

    constructor(private userService: UserService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.user = new User();
    }

    public closeModal() {
        this.closeAdminClearModal.nativeElement.click();
    }

    public clearData() {

        this.userService.clearUserData(this.user.id).subscribe(

            data => {

                this.closeModal();
                this.clearSuccess.emit(this.user.id);
                this.toastr.success('Success', 'User data cleared.');
            },

            err => {
                this.showErrorMessage(err);
            }
        );
    }

    public showErrorMessage(error: any) {
        this.toastr.error('Error while clearing data. Reason: ' + error);
    }
}
