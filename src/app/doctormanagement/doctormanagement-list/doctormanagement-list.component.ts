

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctormanagementService } from 'src/app/shared/service/doctormanagement.service';
import { Doctors } from 'src/app/shared/model/doctors';

@Component({
   selector: 'app-doctormanagement-list',
   templateUrl: './doctormanagement-list.component.html',
  styleUrls: ['./doctormanagement-list.component.scss']
})
export class DoctormanagementListComponent implements OnInit {
  //declare variables
  page: number=1;
  pageSize: number=5;
  searchTerm: string='';

  constructor(public doctormanagementService: DoctormanagementService,
    private router : Router,private toastr: ToastrService) { }

  //Life Cycle hook
  ngOnInit(): void {
    this.doctormanagementService.getAllSpecialization();
    
      this.doctormanagementService.getAllDoctors(); 
      this.doctormanagementService. getAllDoctors(); 
    
  }
  getSpecilizationName(specializationId: number): string {
    const specialization = this.doctormanagementService.specialization.find(c => c.SpecializationId === specializationId);
    return specialization ? specialization.SpecializationName : 'Unknown';
  }
  getDoctorName(doctor: any): string {
    // Check if the doctor object has a valid Registration property
    if (doctor?.Registration?.StaffId) {
      // Find the staff record based on the StaffId from the Registration property
      const staff = this.doctormanagementService.staff.find(
        s => s.StaffId === doctor.users.StaffId
      );
  
      // Return the StaffName if found, otherwise return 'Unknown'
      return staff ? staff.StaffName : 'Unknown';
    }
  
    // If Registration or StaffId is missing, return 'Unknown'
    return 'Unknown';
  }
  
   

 // Filter staff based on search term
   filtereddoctors() {
     if (!this.searchTerm) {
       return this.doctormanagementService.doctor;
     }
     const searchTermLower = this.searchTerm.toLowerCase();
     return this.doctormanagementService.doctor.filter(doctor => {
       const docCode = `DR${doctor.DoctorId}`.toLowerCase();
       return (
         doctor.specialization.SpecializationName?.toLowerCase().includes(searchTermLower) ||
         docCode.includes(searchTermLower)
       );
     });
   }
 
   Updatedoctors(doctor:Doctors):void{
     console.log(doctor);
     this.populatedoctorData(doctor);
     this.router.navigate(['/doctormanagement/edit/'+doctor.DoctorId]);
     //Call Populate Employee
   }
 
   // Populate staff data for update
   populatedoctorData(doctor: Doctors): void {
     console.log('Inside populatedoctorData method');
     console.log(doctor);
 this.doctormanagementService.formStaffData = { ...doctor };
   }
 
   // Delete staff record
   deletedoctor(doctor: Doctors): void {
     if (confirm('Are you sure you want to disable this record?')) {
      doctor.DoctorIsActive = false; // Mark staff as inactive
       this.doctormanagementService.Updatedoctors(doctor).subscribe(
         response => {
           console.log(response);
           this.toastr.info('Staff has been deleted successfully', 'EMS v2024');
           this.doctormanagementService.getAllDoctors();
         },
         error => {
           console.error(error);
           this.toastr.error('Something went wrong! Please try again.', 'CMS');
         }
       );
     }
   }
 }
 