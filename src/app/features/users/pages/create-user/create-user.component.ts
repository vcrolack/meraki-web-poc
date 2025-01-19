import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLinkWithHref } from '@angular/router';
import { CreateUserRequest } from '../../interfaces/create-user-request.interface';
import { UserService } from '../../services/user.service';
import { USERS_ROLES } from '../../constants/user.constants';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule, RouterLinkWithHref],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  createUserForm!: FormGroup;
  USERS_ROLES = USERS_ROLES;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createUserForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ],
      ],
      nickname: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      birthdate: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      role: ['User', []],
      pfpUrl: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  getErrorMessage(formControlName: string): string {
    const control = this.createUserForm.get(formControlName);
    if (control?.hasError('required')) {
      return 'Name is required';
    } else if (control?.hasError('minlength')) {
      return `Name must be at least ${control.errors?.['minlength'].requiredLength} characters`;
    } else if (control?.hasError('maxlength')) {
      return `Name must be at most ${control.errors?.['maxlength'].requiredLength} characters`;
    }
    return '';
  }

  createUser(payload: CreateUserRequest) {
    this.userService.create(payload).subscribe((response) => {
      if (response.statusCode === HttpStatusCode.Created)
        this.router.navigate(['/users']);
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const values = this.createUserForm.value;
    const modificatedValues = {
      ...values,
      role: {
        id: parseInt(values.role),
      },
    };
    this.createUser(modificatedValues);
  }
}
