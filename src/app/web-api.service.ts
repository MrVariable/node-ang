import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/api';

  getUsers() {
    return this.http.get(`${this.url}/employees`);
  }

  getUplineDetails(userId) {
    return this.http.get(`${this.url}/upline-details/${userId}`);
  }

  getGroupSalary(userId) {
    return this.http.get(`${this.url}/group-salary/${userId}`);
  }
}
