import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TelephoneInputDirective } from '../shared/telephone-input.directive';
import { Patient } from '../types/patient.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import * as DataActions from '../store/patient-data.actions';
import * as DataSelectors from '../store/patient-data.selectors'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule} from '@angular/material/core'; // Ensure this import
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-referral-form',
  standalone: true,
  imports: [TelephoneInputDirective,     
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule
],
  templateUrl: './referral-form.component.html',
  styleUrl: './referral-form.component.css'
})
export class ReferralFormComponent implements OnInit{
  patientForm!: FormGroup;
  referralReasons = ['Routine Checkup', 'Injury', 'Cardiac', 'Neuro', 'Other'];
  referralStatuses = ['PENDING', 'ACCEPTED', 'DECLINED'];
  error$: Observable<any>;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.error$ = this.store.select(DataSelectors.selectDataError)
  }

  ngOnInit(): void {
    this.store.dispatch(DataActions.clearError());
    this.patientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      contactInfo: ['', [Validators.required, Validators.pattern(/^\(\d{3}\)\d{3}-\d{4}$/)]],
      dateOfBirth: ['', [Validators.required]],
      reasonForReferral: ['', Validators.required],
      referralStatus: ['', Validators.required],
      customReason: ['']
    });
    this.patientForm.get('reasonForReferral')?.valueChanges.subscribe(value => {
      if (value === 'Other') {
        this.patientForm.get('customReason')?.setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(255)]);
      } else {
        this.patientForm.get('customReason')?.clearValidators();
      }
      this.patientForm.get('customReason')?.updateValueAndValidity();
    });

  }

  get name() {
    return this.patientForm.get('name');
  }

  get contactInfo() {
    return this.patientForm.get('contactInfo');
  }

  get reasonForReferral() {
    return this.patientForm.get('reasonForReferral');
  }

  get referralStatus() {
    return this.patientForm.get('referralStatus');
  }

  get dateOfBirth() {
    return this.patientForm.get('dateOfBirth');
  }

  get customReason() {
    return this.patientForm.get('customReason');
  }


  onSubmit(): void {
    if (this.patientForm.valid) {
      const formValue = {...this.patientForm.value};
      const dateOfBirth = this.formatDate(formValue.dateOfBirth);
      formValue.dateOfBirth = dateOfBirth;
      if(formValue.reasonForReferral === 'Other'){
        formValue.reasonForReferral = formValue.customReason;
      }
      const newPatient: Patient = formValue;
      this.store.dispatch(DataActions.createPatient({patient: newPatient}))
    } 
  }
  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${this.padZero(month)}-${this.padZero(day)}`;
  }

  private padZero(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }
}
