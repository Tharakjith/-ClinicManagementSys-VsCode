import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Doctors } from 'src/app/shared/model/doctors';
import { DmanagementService } from 'src/app/shared/service/dmanagement.service';

@Component({
  selector: 'app-doctormgmt-list',
  templateUrl: './doctormgmt-list.component.html',
  styleUrls: ['./doctormgmt-list.component.scss']
})
export class DoctormgmtListComponent implements OnInit {
  page: number = 1;
  pageSize: number = 3;

  // Search term
  searchTerm: string = '';

  constructor(
    public doctorservice: DmanagementService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.doctorservice.getAlldoctors();
    this.doctorservice.getAllstaff();
    this.doctorservice.getAllSpecilization();
  }

  filteredStaffs() {
    if (!this.searchTerm) {
      return this.doctorservice.doctors;
    }
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.doctorservice.doctors.filter(doctor => {
      const staffCode = `DR${doctor.DoctorId}`.toLowerCase();
      return (
        doctor.Specialization.SpecializationName?.toLowerCase().includes(searchTermLower) ||
        staffCode.includes(searchTermLower)
      );
    });
  }
  Updateusers(doctors:Doctors):void{
    console.log(doctors);
    this.populateStaffData(doctors);
    this.router.navigate(['/doctormgmt/edit/'+doctors.DoctorId]);
    
  }

  // Populate staff data for update
  populateStaffData(doctors: Doctors): void {
    console.log('Inside populateStaffData method');
    console.log(doctors);
     this.doctorservice.formStaffData = { ...doctors };
  }

  // Delete staff record
  deleteStaff(doctors: Doctors): void {
    if (confirm('Are you sure you want to DELETE this record?')) {
      doctors.DoctorIsActive = false; // Mark staff as inactive
      this.doctorservice.Updateusers(doctors).subscribe(
        response => {
          console.log(response);
          this.toastr.info('Staff has been deleted successfully', 'EMS v2024');
          this.doctorservice.getAlldoctors();
        },
        error => {
          console.error(error);
          this.toastr.error('Something went wrong! Please try again.', 'CMS');
        }
      );
    }
  }
}