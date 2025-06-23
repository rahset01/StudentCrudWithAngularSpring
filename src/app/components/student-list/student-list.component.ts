import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {
  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.students = this.studentService.getStudents();
  }

  onAdd(): void {
    this.router.navigate(['/student-form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/student-form'], { queryParams: { id } });
  }

  onDelete(id: number): void {
    this.studentService.deleteStudent(id);
    this.loadStudents(); // Refresh list
  }
}
