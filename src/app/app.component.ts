import { Component, OnInit } from '@angular/core';
import { WebApiService } from './web-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public features: Array<any> = [
    {id: 'uplineDetails', displayName: 'Get upline details'},
    {id: 'groupSalary', displayName: 'Get group salary'}
  ];
  public selectedFeature: string = this.features[0].id;
  public users: Array<any>;
  public selectedUser: any;
  public uplineDetails: Array<any>;
  public groupSalary: any;

  constructor(public webApiService: WebApiService) {}

  async ngOnInit() {
    try {
      this.webApiService.getUsers().subscribe((res: Array<any>) => {
        console.log(res);
        this.users = res;
        this.selectedUser = this.users[0].id;
        this.makeApiCall(this.selectedFeature, this.selectedUser);
      });
    } catch (e) {
      console.error('Error occurred while getting users.', e);
    }
  }

  getUplineDetails(userId: number) {
    try {
      this.webApiService.getUplineDetails(userId).subscribe((res: Array<any>) => {
        this.uplineDetails = res;
      });
    } catch (e) {
      console.error('Error occurred while getting upline details.', e);
    }
  }

  getGroupSalary(userId: number) {
    try {
      this.webApiService.getGroupSalary(userId).subscribe((res: any) => {
        this.groupSalary = res;
      });
    } catch (e) {
      console.error('Error occurred while getting group salary.', e);
    }
  }

  makeApiCall(featureId: string, userId: number) {
    switch (featureId) {
      case 'uplineDetails':
        this.getUplineDetails(userId);
        break;
      case 'groupSalary':
        this.getGroupSalary(userId);
        break;
    }
  }
}
