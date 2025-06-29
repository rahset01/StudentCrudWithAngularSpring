import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  student: Student = {
    id: 0,
    name: '',
    email: '',
    course: ''
  };

  isEdit: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.isEdit = true;
      this.studentService.getStudentById(+id).subscribe({
        next: (data) => (this.student = data),
        error: (err) => {
          console.error('Error loading student:', err);
          this.errorMessage = 'Failed to load student.';
        }
      });
    }
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.studentService.updateStudent(this.student).subscribe({
        next: () => {
          this.showNotification('Student updated successfully!');
          this.router.navigate(['/students']);
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.showNotification('Failed to update student.');
        }
      });
    } else {
      this.studentService.addStudent(this.student).subscribe({
        next: () => {
          this.showNotification('Student added successfully!');
          this.router.navigate(['/students']);
        },
        error: (err) => {
          console.error('Add failed:', err);
          this.showNotification('Failed to add student.');
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/students']);
  }
}
