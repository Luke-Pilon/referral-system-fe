import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../../types/patient.interface';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [RouterModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
  @Input() patient!: Patient;
  @Output() delete = new EventEmitter<number>();

  constructor(public dialog: MatDialog){}

   confirmDelete(){
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delete.emit(this.patient.id);
      }
    })
   }
}
