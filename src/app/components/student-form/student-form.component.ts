import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {
  student: Student = { id: 0, name: '', email: '', course: '' };
  isEdit = false;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const id = params['id'];
    if (id) {
      this.studentService.getStudentById(+id).subscribe({
        next: (existing) => {
          this.student = { ...existing };
        },
        error: (err) => {
          console.error('Failed to fetch student', err);
        }
      });
    }
  });
}

  onSubmit(): void {
    if (this.isEdit) {
      this.studentService.updateStudent(this.student);
    } else {
      this.studentService.addStudent(this.student);
    }
    this.router.navigate(['/students']);
  }

  onCancel(): void {
    this.router.navigate(['/students']);
  }
}
