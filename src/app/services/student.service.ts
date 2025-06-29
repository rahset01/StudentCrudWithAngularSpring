import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    });
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  addStudent(student: Student): Observable<Student> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${sessionStorage.getItem('token')}`
  });
  return this.http.post<Student>(this.apiUrl, student, { headers });
}

updateStudent(student: Student): Observable<Student> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${sessionStorage.getItem('token')}`
  });
  return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student, { headers });
}

getStudentById(id: number): Observable<Student> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${sessionStorage.getItem('token')}`
  });
  return this.http.get<Student>(`${this.apiUrl}/${id}`, { headers });
}


  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
