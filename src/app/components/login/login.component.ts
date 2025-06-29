import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Important
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  loginFailed = false;
  includesEmailError = false;
  missingSpecialCharError = false;
  formSubmitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    if (form.invalid) return;

    this.includesEmailError = this.password.toLowerCase().includes(this.email.toLowerCase());
    this.missingSpecialCharError = !/[!@#$%^&*(),.?":{}|<>]/.test(this.password);

    if (this.includesEmailError || this.missingSpecialCharError) return;

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: () => {
        this.loginFailed = true;
      }
    });
  }
}
