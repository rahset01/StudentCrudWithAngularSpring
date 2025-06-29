import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { CommonModule } from '@angular/common'; // ✅ For ngIf, ngFor, etc.

@Component({
  selector: 'app-login',
  standalone: true, // ✅ Ensure standalone is enabled
  imports: [CommonModule, FormsModule], // ✅ Add FormsModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginFailed: boolean = false;

  includesEmailError: boolean = false;
  missingSpecialCharError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.includesEmailError = this.password.toLowerCase().includes(this.email.toLowerCase());
    this.missingSpecialCharError = !/[!@#$%^&*(),.?":{}|<>]/.test(this.password);

    if (this.includesEmailError || this.missingSpecialCharError) {
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.loginFailed = false;
        this.router.navigate(['/students']);
      },
      error: () => {
        this.loginFailed = true;
      }
    });
  }
}
