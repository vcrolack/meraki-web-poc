import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import {
  ActivatedRoute,
  RouterLinkWithHref,
  RouterModule,
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UpdateUserRequest } from '../../interfaces/update-user-request.interface';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  updatedUserForm!: FormGroup;
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);

  userId!: string;
  updatedUser!: User;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    this.updatedUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.userService.findOne(this.userId).subscribe((response) => {
      this.updatedUser = response.data;
      this.updatedUserForm.patchValue({
        name: response.data.name,
        lastName: response.data.lastName,
        nickname: response.data.nickname,
        phone: response.data.phone,
      });
    });
  }

  updateUser(payload: UpdateUserRequest) {
    this.userService.update(this.userId, payload).subscribe();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.updatedUserForm.valid) {
      this.updateUser(this.updatedUserForm.value);
    }
  }
}
