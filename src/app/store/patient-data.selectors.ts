import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromPatientData from './patient-data.reducer';

export const selectPatientDataState = createFeatureSelector<fromPatientData.State>('patientData');

export const selectPatientData = createSelector(
    selectPatientDataState,
    (state: fromPatientData.State) => state.patientData
)

export const selectDataLoading = createSelector(
    selectPatientDataState,
    (state: fromPatientData.State) => state.loading
  );
  
  export const selectDataError = createSelector(
    selectPatientDataState,
    (state: fromPatientData.State) => state.error
  );
  