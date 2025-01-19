import { Component, inject, signal } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [TableComponent, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  userService = inject(UserService);
  columns = [
    '#',
    'name',
    'lastName',
    'nickname',
    'phone',
    'email',
    'role',
    'actions',
  ];
  users!: User[];

  ngOnInit() {
    this.userService.findAll().subscribe((users) => (this.users = users.data));
  }
}
