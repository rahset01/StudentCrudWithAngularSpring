import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    { id: 1, name: 'Rahul', email: 'rahul@example.com', course: 'Angular' },
    { id: 2, name: 'Asha', email: 'asha@example.com', course: 'Spring Boot' },
    { id: 3, name: 'Vikram', email: 'vikram@example.com', course: 'Java' }
  ];

  getStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student): void {
    student.id = this.students.length + 1;
    this.students.push(student);
  }

  updateStudent(student: Student): void {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students[index] = student;
    }
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(student => student.id !== id);
  }

  getStudentById(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }
}
