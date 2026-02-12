import { Component, OnInit } from '@angular/core';
import { UsersFacade } from '../../state/users.facade';
import { UserDTO } from 'src/app/shared/models/userDTO.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ModalController } from '@ionic/angular';
import { PaginationDTO } from 'src/app/shared/models/paginationDTO';
import { SearchRequestDTO } from 'src/app/shared/models/searchRequestDTO';
import { TableFieldtDTO } from 'src/app/shared/models/tableFieldDTO';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/core/storage/services/session-storage.service';
import { AuthFacade } from 'src/app/modules/+auth/state/auth.facade';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  readonly total$ = this._usersFacade.total$;
  readonly usersList$ = this._usersFacade.usersList$;
  readonly usersList = toSignal(this.usersList$);

  usersFormGroup!: FormGroup;
  public minDate: string | undefined;

  pageSize: number = 10;
  tableFields: TableFieldtDTO[] = [
    {
      columnName: 'email',
      visible: true,
      customTemplate: false,
      sortable: true,
      width: 30,
    },
    {
      columnName: 'role',
      visible: true,
      customTemplate: false,
      sortable: true,
      width: 30,
    },
  ];
  searchReq: SearchRequestDTO = {
    paginationDTO: {
      page: 0,
      pageSize: 10,
    },
    sortField: 'name',
    sortOrder: 'asc',
  };

  constructor(
    private readonly _usersFacade: UsersFacade,
    private readonly _fb: FormBuilder,
    private modalController: ModalController,
    private readonly _authFacade: AuthFacade
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this._initFormGroup();
    this._usersFacade.loadUsersListBySearchReq(this.searchReq);
  }

  logout() {
    this._authFacade.logout();
  }

  pageChange(paginationDTO: PaginationDTO) {
    this.searchReq.paginationDTO = paginationDTO;
    this._usersFacade.loadUsersListBySearchReq(this.searchReq);
  }

  deleteUser(user: UserDTO, $event: MouseEvent) {
    $event.stopPropagation();
    this._usersFacade.deleteUserById(user.id);
  }

  close(modal: any) {
    modal.dismiss();
    this.usersFormGroup.reset({
      destination: null,
      checkin: this.minDate,
      checkout: this.minDate,
      rooms: 1,
      adults: 2,
      resultsPerPage: 15,
      page: 1,
    });
  }

  saveUser(modal: any) {
    if (this.usersFormGroup.valid) {
      let user: UserDTO = {
        email: this.usersFormGroup.controls['email'].value,
        password: this.usersFormGroup.controls['password'].value,
        role: this.usersFormGroup.controls['role'].value,
      };
      this._usersFacade.addUser(user);
      modal.dismiss();
      this.usersFormGroup.reset();
    } else {
      Object.keys(this.usersFormGroup.controls).forEach((field) => {
        const control = this.usersFormGroup.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  toggleFilter() {}

  private _initFormGroup() {
    this.usersFormGroup = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      role: [null, Validators.required],
    });
  }
}
