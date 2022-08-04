import { ApiService } from '../shared/api.service';
import { UsersModel } from './users-list.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var window: any;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  [x: string]: any;
  showAdd: boolean;
  showEdit: boolean;
  formModal: any;
  formValue: FormGroup;
  usersModelObj: UsersModel = new UsersModel();
  usersData: any;
  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.formValue = this.formbuilder.group({
      fullName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')],
      ],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      country: [''],
      adress: [''],
    });
    this.getAllUsers();
  }

  get f() {
    return this.formValue.controls;
  }

  openFormModalAdd() {
    this.formValue.reset();
    this.formModal.show();
    this.showAdd = true;
    this.showEdit = false;
  }

  postUsersDetails() {
    this.usersModelObj.fullName = this.formValue.value.fullName;
    this.usersModelObj.mobileNumber = this.formValue.value.mobileNumber;
    this.usersModelObj.email = this.formValue.value.email;
    this.usersModelObj.country = this.formValue.value.country;
    this.usersModelObj.adress = this.formValue.value.adress;

    this.api.postUser(this.usersModelObj).subscribe((res: any) => {
      console.log(res);
      const ref = document.getElementById('close');
      ref?.click();
      this.formValue.reset();
      this.getAllUsers();
    }),
      (err: any) => {
        alert('Something went wrong');
      };
  }

  getAllUsers() {
    this.api.getUsers().subscribe((res) => {
      this.usersData = res;
    });
  }

  deleteUser(user: any) {
    this.api.deleteUser(user.id).subscribe((res) => {
      console.log(res);
    });
    this.getAllUsers();
  }

  editUser(user: any) {
    this.formModal.show();
    this.showAdd = false;
    this.showEdit = true;
    this.usersModelObj.id = user.id;
    this.formValue.controls['fullName'].setValue(user.fullName);
    this.formValue.controls['mobileNumber'].setValue(user.mobileNumber);
    this.formValue.controls['email'].setValue(user.email);
    this.formValue.controls['country'].setValue(user.country);
    this.formValue.controls['adress'].setValue(user.adress);
  }

  updateUser() {
    this.usersModelObj.fullName = this.formValue.value.fullName;
    this.usersModelObj.mobileNumber = this.formValue.value.mobileNumber;
    this.usersModelObj.email = this.formValue.value.email;
    this.usersModelObj.country = this.formValue.value.country;
    this.usersModelObj.adress = this.formValue.value.adress;

    this.api
      .updateUser(this.usersModelObj, this.usersModelObj.id)
      .subscribe((res) => {
        console.log(res);
        const ref = document.getElementById('close');
        ref?.click();
        this.formValue.reset();
        this.getAllUsers();
      });
  }
}
