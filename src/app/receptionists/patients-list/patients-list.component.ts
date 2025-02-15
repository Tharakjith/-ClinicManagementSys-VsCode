import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/shared/model/patient';
import { PatientService } from 'src/app/shared/service/patient.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {

  // Declare variables
  page: number = 1;
  pageSize: number = 5;
  searchTerm: string = '';
  searchPerformed: boolean = false; // Added this property
  isMessageShown: boolean = false;

  constructor(public patientService: PatientService, 
              private router: Router, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log("Patient List Component");
    this.patientService.getAllPatients();
  }

  // Trigger Search
  onSearch(): void {
    this.searchPerformed = this.searchTerm.trim().length > 0;
    this.filteredPatients(); // Recalculate filtered patients
  }

  // Filter Patients Based on Search
  filteredPatients() {
    if (!this.searchPerformed) {
      return [];
    }

    const searchTermLower = this.searchTerm.toLowerCase();

    const filteredList = this.patientService.patients.filter(e => {
      const patCode = `PC${e.PatientId}`.toLowerCase();
      return (
        e.PatientPhone?.toLowerCase().includes(searchTermLower) ||
        patCode.includes(searchTermLower)
      );
    });

    // Show toastr if no patients found
    if (filteredList.length === 0 && !this.isMessageShown) {
      this.toastr.info('No patients found for the search term.', 'CMS v2024');
      this.isMessageShown = true;
    } else if (filteredList.length > 0) {
      this.isMessageShown = false;
    }

    return filteredList;
  }

  // Edit Patient
  editPatient(patient: Patient): void {
    console.log(patient);
    this.populatePatientData(patient);
    this.router.navigate(['/patients/edit/' + patient.PatientId]);
  }

  // Book Appointment
  bookAppointment(patient: Patient): void {
    console.log(patient);
    this.router.navigate(['/patients/book/', patient.PatientId]);
  }

  // Populate Patient Data
  populatePatientData(patient: Patient) {
    console.log("Inside populate method");
    console.log(patient);

    const datePipe = new DatePipe("en-UK");
    const formattedDate: any = datePipe.transform(patient.Dob, 'yyyy-MM-dd');
    patient.Dob = formattedDate;

    this.patientService.formPatientData = { ...patient };
  }

  // Delete Patient
  deletePatient(patient: Patient) {
    if (confirm("Are you sure to DISABLE this record?")) {
      patient.IsActive = false;
      this.patientService.updatePatient(patient).subscribe(response => {
        console.log(response);
        this.toastr.success('Patient data has been disabled successfully', 'CMS v2024');
        this.patientService.getAllPatients();
      }, (error) => {
        console.log(error);
        this.toastr.error('Something wrong! try again...', 'CMS v2024');
      });
    }
  }
}