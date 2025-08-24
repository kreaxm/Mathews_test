import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'] // optional
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // No credential check – simply allow any username/password
      this.router.navigate(['/dashboard']);
    } else {
      this.loginError = 'Please fill out all fields correctly.';
    }
  }
}
