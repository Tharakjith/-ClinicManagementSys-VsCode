import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/shared/service/patient.service';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.scss']
})
export class PatientHistoryComponent implements OnInit {

  constructor(public patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getAllPatients();
  }

}