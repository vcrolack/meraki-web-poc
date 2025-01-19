import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenCookieService } from '../../services/token-cookie.service';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  private authService = inject(AuthService);
  private router = inject(Router);
  private tokenCookieService = inject(TokenCookieService);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit() {
    this.authService.validateToken().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/users']);
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe((response) => {
        this.tokenCookieService.setToken(response.data.token);
        if (response.statusCode === HttpStatusCode.Created)
          this.router.navigate(['/users']);
      });
    }
  }
}
