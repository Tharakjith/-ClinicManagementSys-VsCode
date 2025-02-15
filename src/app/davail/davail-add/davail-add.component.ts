// davail-add.component.ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Doctors } from 'src/app/shared/model/doctors';
import { Timeslot } from 'src/app/shared/model/timeslot';
import { Weekdays } from 'src/app/shared/model/weekdays';
import { DavailService } from 'src/app/shared/service/davail.service';

@Component({
  selector: 'app-davail-add',
  templateUrl: './davail-add.component.html',
  styleUrls: ['./davail-add.component.scss']
})
export class DavailAddComponent implements OnInit {
  errorMessage: string | null = null;
  doctorId: number = 0;

  constructor(
    public davailservice: DavailService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get doctorId from URL parameter
    this.route.params.subscribe(params => {
      if (params['doctorId']) {
        this.doctorId = +params['doctorId'];
        // Set the doctorId in the form data
        this.davailservice.formStaffData.DoctorId = this.doctorId;
      }
    });

    this.davailservice.getAllTimeslot();
    this.resetForm();
  }

  resetForm() {
    this.davailservice.formStaffData = {
      AvailabilityId: 0,
      TimeSlotId: 0,
      Session: '',
      StartTime: '',
      EndTime: '',
      WeekdaysId: 0,
      WeekdaysName: '',
      DoctorId: this.doctorId,
      Doctors: new Doctors(),
      Timeslot: new Timeslot(),
      Weekdays: new Weekdays()
    };
  }

  onSubmit(stForm: NgForm) {
    if (stForm.valid) {
      this.adddoctoravailability(stForm);
    }
  }

  adddoctoravailability(stForm: NgForm) {
    const availability = { ...stForm.value, DoctorId: this.doctorId };
    
    this.davailservice.insertavailability(availability).subscribe(
      (response) => {
        this.toastr.success('Availability successfully added.', 'CMS v2025');
        this.errorMessage = null;
        this.resetForm();
        this.router.navigate(['/doctormgmt/list']); // R
      },
      (error) => {
        console.error(error);
        this.toastr.error('Failed to add availability', 'CMS v2025');
        this.errorMessage = 'An error occurred: ' + error.message;
      }
    );
  }
}