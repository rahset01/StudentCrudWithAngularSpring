import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }


  // ✅ Protected Routes
  {
    path: 'students',
    component: StudentListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'student-form',
    component: StudentFormComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: 'login' }
];
