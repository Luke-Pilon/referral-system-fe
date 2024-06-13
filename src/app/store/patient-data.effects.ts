// src/app/store/effects/data.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PatientDataService } from '../services/patient-data.service';
import * as DataActions from './patient-data.actions';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PatientDataEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.loadData),
      mergeMap(() =>
        this.dataService.getData().pipe(
          map(patientData => DataActions.loadDataSuccess({ patientData })),
          catchError(error => of(DataActions.loadDataFailure({ error })))
        )
      )
    )
  );

  createPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.createPatient),
      mergeMap(action =>
        this.dataService.createPatient(action.patient).pipe(
          map(patient => DataActions.createPatientSuccess({ patient })),
          catchError((error: HttpErrorResponse) => {
            let message = 'Unexpected error occurred'
            if(error.status === 400){message = "Error creating new patient referral. Please check your inputs and try again."}
            if(error.status === 500){message = "Server error, please try again later."}
            return of(DataActions.createPatientFailure({ error: message }))}
          )
        )
      )
    )
  );

  createPatientSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DataActions.createPatientSuccess),
        map(action => {
          this.router.navigate(['/patients']);
        })
      ),
    { dispatch: false }
  );

  deletePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.deletePatient),
      mergeMap(action =>
        this.dataService.deletePatient(action.id).pipe(
          map(() => DataActions.deletePatientSuccess({ id: action.id })
          ),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unknown error occurred';
            if (error.status === 404) {
              errorMessage = 'Given patient id was not found. Please check and try again.';
            } else if (error.status === 500) {
              errorMessage = 'Server Error: Please try again later';
            }
            return of(DataActions.deletePatientFailure({ error: errorMessage }));
          })
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private dataService: PatientDataService,
    private router: Router
  ) {}
}
