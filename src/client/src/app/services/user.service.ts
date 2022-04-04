import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { User } from '../../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  routeString = 'users/';
  selectedUserId = '';

  constructor(private api: ApiService) {}

  getUsers() {
    return this.api.get<{ data: User[] }>(`${this.routeString}users`).pipe(map(res => res.data));
  }

  createUser(user: User) {
      return this.api.post<{data: User}, User>(`${this.routeString}create-user`, user).pipe(map(res => res.data));
  }

  login(user: Partial<User>) {
    return this.api.post< User,Partial<User> >(`${this.routeString}login`,user);
  }

  updateUser(user: User) {
      return this.api.put<User,User>(`${this.routeString}update-user/` + user._id, user);
  }

  deleteUser(user: User) {
    return this.api.delete<{data: User}>(`${this.routeString}delete-user/` + user._id).pipe(map(res => res.data));
  }

  selectUser(id: string) {
    this.selectedUserId = id
;  }
}
