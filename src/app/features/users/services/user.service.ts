import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { SuccessResponse } from '../../../core/interfaces/success-response.interface';
import { UpdateUserRequest } from '../interfaces/update-user-request.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  findAll() {
    return this.http.get<SuccessResponse<User[]>>(
      `${environment.apiUrl}/users/find-all`
    );
  }

  findOne(id: string) {
    return this.http.get<SuccessResponse<User>>(
      `${environment.apiUrl}/users/find-one?id=${id}`
    );
  }

  update(id: string, user: UpdateUserRequest) {
    return this.http.patch<SuccessResponse<User>>(
      `${environment.apiUrl}/users/update?id=${id}`,
      user
    );
  }

  delete(id: string) {
    return this.http.delete<SuccessResponse<any>>(
      `${environment.apiUrl}/users/delete?id=${id}`
    );
  }
}
