import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../store/patient-data.reducer';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Patient } from '../types/patient.interface';
import * as DataActions from '../store/patient-data.actions'
import * as DataSelectors from '../store/patient-data.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PatientComponent } from './patient/patient.component';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReferralStatus } from '../types/referral-status.enum';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, 
    PatientComponent, 
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PatientComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent implements OnInit {
  patientData$: Observable<Patient[]>;
  filteredPatientData$: Observable<Patient[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  filterForm: FormGroup;
  referralStatuses = Object.values(ReferralStatus);

  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.patientData$ = this.store.select(DataSelectors.selectPatientData);
    this.loading$ = this.store.select(DataSelectors.selectDataLoading);
    this.error$ = this.store.select(DataSelectors.selectDataError);

    this.filterForm = this.fb.group({
      name: [''],
      referralStatus: ['']
    });

    this.filteredPatientData$ = combineLatest([
      this.patientData$,
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value))
    ]).pipe(
      map(([patients, filters]) => this.applyFilters(patients, filters))
    );
  }

  ngOnInit(): void {
    this.store.dispatch(DataActions.clearError());
    this.store.dispatch(DataActions.loadData());
  }

  onDelete(patientId: number) {
    this.store.dispatch(DataActions.deletePatient({ id: patientId }));
  }

  private applyFilters(patients: Patient[], filters: any): Patient[] {
    return patients.filter(patient => {
      const matchesName = patient.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesStatus = filters.referralStatus ? patient.referralStatus === filters.referralStatus : true;
      return matchesName && matchesStatus;
    });
  }

}
