import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  includesNameError: boolean = false;
  missingSpecialCharError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(form: NgForm): void {
    if (form.invalid) return;

    // Reset validation flags
    this.includesNameError = false;
    this.missingSpecialCharError = false;

    // Validate that password does not include name or email
    if (this.password.includes(this.name) || this.password.includes(this.email)) {
      this.includesNameError = true;
    }

    // Validate special character in password
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.password)) {
      this.missingSpecialCharError = true;
    }

    // Stop if any custom validation fails
    if (this.includesNameError || this.missingSpecialCharError) {
      return;
    }

    // Call register API
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert('Registration failed. Please try again.');
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/login']);
  }
}
