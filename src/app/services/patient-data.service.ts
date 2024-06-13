// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../types/patient.interface';
import { PatientNote } from '../types/patient-note.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {
  private apiUrl = 'http://localhost:8080/patients';  

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getPatientById(id: number): Observable<Patient | undefined> {
    return this.http.get<Patient | undefined>(`${this.apiUrl}/${id}`);
  }


  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

  deletePatient(patientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${patientId}`)
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${patient.id}`, patient)
  }
}
