import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Patient } from '../types/patient.interface';
import { PatientNote } from '../types/patient-note.interface';
import { ReferralStatus } from '../types/referral-status.enum';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { PatientDataService } from '../services/patient-data.service';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patient$!: Observable<Patient | undefined>;
  referralStatuses = Object.values(ReferralStatus);
  newNoteContent = '';
  error: string | null = null;

  constructor(private route: ActivatedRoute, private patientDataService: PatientDataService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.patient$ = this.patientDataService.getPatientById(+id).pipe(
        map(patient => {
          if (patient) {
            patient.patientNotes = patient.patientNotes || [];
            console.log('patient notes', patient.patientNotes)
          }
          return patient;
        }),
        catchError(error => {
          if (error.status === 404) {
            this.error = 'Patient not found';
          } else {
            this.error = 'An unexpected error occurred';
          }
          return of(undefined);
        })
      );
    }
  }

  sortedNotes(notes: PatientNote[]): PatientNote[] {
    if(notes){    
      return notes.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      return [];
    }
  }

  submit(patient: Patient) {
    const patientCopy = { ...patient, patientNotes: [...patient.patientNotes] }; 
    if (this.newNoteContent.trim()) {
      const newNote: PatientNote = {
        content: this.newNoteContent,
        createdAt: new Date()
      };
      patientCopy.patientNotes.push(newNote);
    }

    this.patientDataService.updatePatient(patientCopy).subscribe({
      next: (updatedPatient) => {
        if (updatedPatient) {
          this.newNoteContent = ''
          this.patient$ = of(updatedPatient);
        }
      },
      error: (error) => {
        this.error = 'Failed to update patient. Please try again.';
      }
    });
  }
}
