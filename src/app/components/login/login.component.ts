import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { StrictEmailDirective } from '../../directives/strict-email.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, StrictEmailDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  loginFailed = false;

  // Custom validation flags
  includesUsernameError = false;
  missingSpecialCharError = false;

  constructor(private router: Router) {}

  onLogin(form: NgForm): void {
    // Reset custom errors
    this.includesUsernameError = false;
    this.missingSpecialCharError = false;

    if (form.invalid) {
      Object.values(form.controls).forEach(control => control.markAsTouched());
      return;
    }

    // Custom validations
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (
      this.username &&
      this.password.toLowerCase().includes(this.username.toLowerCase())
    ) {
      this.includesUsernameError = true;
    }

    if (!specialCharRegex.test(this.password)) {
      this.missingSpecialCharError = true;
    }

    // If any custom error, prevent login
    if (this.includesUsernameError || this.missingSpecialCharError) {
      return;
    }

    // ✅ Login logic
    if (this.username === 'admin@gmail.com' && this.password === 'rahul@123') {
      this.router.navigate(['/students']);
    } else {
      this.loginFailed = true;
    }
  }
}
