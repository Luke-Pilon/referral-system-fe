import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule, Routes } from '@angular/router';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { patientDataReducer } from './app/store/patient-data.reducer';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { PatientDataEffects } from './app/store/patient-data.effects';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PatientDashboardComponent } from './app/patient-dashboard/patient-dashboard.component';
import { PatientDetailComponent } from './app/patient-detail/patient-detail.component';
import { ReferralFormComponent } from './app/referral-form/referral-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {path: '', redirectTo: '/patients', pathMatch: 'full'},
  {path: 'patients', component: PatientDashboardComponent},
  {path: 'patient/:id', component: PatientDetailComponent},
  {path: 'referral', component: ReferralFormComponent},
];



bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({patientData: patientDataReducer}),
    provideEffects([PatientDataEffects]),
    importProvidersFrom(HttpClientModule), provideAnimationsAsync(),
    importProvidersFrom(MatDialogModule, MatButtonModule)
  ]
})
  .catch((err) => console.error(err));
