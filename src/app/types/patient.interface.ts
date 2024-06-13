import { PatientNote } from "./patient-note.interface"
import { ReferralStatus } from "./referral-status.enum"


export interface Patient {
    id: number
    name: string
    dateOfBirth: Date
    contactInfo: string
    reasonForReferral: string
    referralStatus: ReferralStatus
    patientNotes: PatientNote[]
}