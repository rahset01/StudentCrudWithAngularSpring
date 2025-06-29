// student-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching students:', err);
        this.errorMessage = 'Failed to load students.';
        this.isLoading = false;
      }
    });
  }

  onAdd(): void {
    this.router.navigate(['/student-form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/student-form'], { queryParams: { id } });
  }

  onDelete(id: number): void {
    this.studentService.deleteStudent(id).subscribe({
      next: () => this.loadStudents(),
      error: (err) => {
        console.error('Delete failed:', err);
        this.errorMessage = 'Failed to delete student.';
      }
    });
  }
}
