import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  includesNameError = false;
  missingSpecialCharError = false;

  constructor(private router: Router) {}

  onRegister(form: NgForm): void {
    // Reset custom error flags
    this.includesNameError = false;
    this.missingSpecialCharError = false;

    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    // Custom password validation
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const passwordLower = this.password.toLowerCase();

    if (
      (this.name && passwordLower.includes(this.name.toLowerCase())) ||
      (this.email && passwordLower.includes(this.email.toLowerCase()))
    ) {
      this.includesNameError = true;
    }

    if (!specialCharRegex.test(this.password)) {
      this.missingSpecialCharError = true;
    }

    if (this.includesNameError || this.missingSpecialCharError) {
      return;
    }

    // ✅ Success logic (you can replace with API call)
    alert('Registration successful!');
    this.router.navigate(['/']);
  }
  onCancel(): void {
    this.router.navigate(['/']);
  }
}