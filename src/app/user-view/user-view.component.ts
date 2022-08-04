import { ApiService } from '../shared/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersModel } from '../users-list/users-list.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent implements OnInit {
  public userId: null | string = null;
  public userModelObj: UsersModel = new UsersModel();
  public userData: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.userId = param.get('userId');
    });

    if (this.userId) {
      this.api.getUser(this.userId).subscribe((response) => {
        this.userData = response;
      });
    }
  }
}
