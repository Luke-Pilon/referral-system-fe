import { createReducer, on } from "@ngrx/store";
import { Patient } from "../types/patient.interface";
import * as DataActions from './patient-data.actions';

export interface State {
    patientData: Patient[];
    loading: boolean;
    error: any;
}

export const initialState: State = {
    patientData: [],
    loading: false,
    error: null
}

export const patientDataReducer = createReducer(
    initialState,
    on(DataActions.loadData, state => ({ ...state, loading: true })),
    on(DataActions.loadDataSuccess, (state, { patientData }) => 
      ({
      ...state,
      loading: false,
      patientData
    })),
    on(DataActions.loadDataFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),
    on(DataActions.createPatientSuccess, (state, { patient }) => ({
      ...state,
      patientData: [...state.patientData, patient],
      error: null
    })),
    on(DataActions.createPatientFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(DataActions.deletePatientSuccess, (state, { id }) => 
      ({
      ...state,
      loading: false,
      patientData: state.patientData.filter(patient => patient.id !== id),
      error: null
    })),
    on(DataActions.deletePatientFailure, (state, { error }) => ({
      ...state,
      error
    })),
  
    on(DataActions.clearError, (state) => ({
      ...state,
      error: null
    }))
  )


  