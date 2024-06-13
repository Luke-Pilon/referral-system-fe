import { createAction, props } from "@ngrx/store";
import { Patient } from "../types/patient.interface";

export const loadData = createAction('[Data] Load Data');
export const loadDataSuccess = createAction(
    '[Data] Load Data Success',
    props<{patientData: Patient[]}>()
);
export const loadDataFailure = createAction(
    '[Data] Load Data Failure',
    props<{ error: any}>()
)

export const createPatient = createAction(
    '[Patient Form] Create Patient',
    props<{ patient: Patient }>()
  );
  
  export const createPatientSuccess = createAction(
    '[Patient Form] Create Patient Success',
    props<{ patient: Patient }>()
  );
  
  export const createPatientFailure = createAction(
    '[Patient Form] Create Patient Failure',
    props<{ error: any }>()
  );

  export const deletePatient = createAction(
    '[Patient Dashboard] Delete Patient',
    props<{ id: number }>()
  );
  
  export const deletePatientSuccess = createAction(
    '[Patient Dashboard] Delete Patient Success',
    props<{ id: number }>()
  );
  
  export const deletePatientFailure = createAction(
    '[Patient Dashboard] Delete Patient Failure',
    props<{ error: string }>()
  );
  
export const clearError = createAction(
    '[App] Clear Error'
)