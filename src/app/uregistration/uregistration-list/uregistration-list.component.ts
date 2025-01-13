import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Registration } from 'src/app/shared/model/registration';
import { RegistrationService } from 'src/app/shared/service/registration.service';

@Component({
  selector: 'app-uregistration-list',
  templateUrl: './uregistration-list.component.html',
  styleUrls: ['./uregistration-list.component.scss']
})
export class UregistrationListComponent implements OnInit {

  page: number = 1;
  pageSize: number = 3;
  searchTerm: string = '';

  constructor(
    public registerService: RegistrationService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.registerService.getAllusers();
    this.registerService.getAllRoles();
    this.registerService.getAllusers();




  }

  getRoleName(roleId: number): string {
    const Role = this.registerService.role.find(c => c.RoleId === roleId);
    return Role ? Role.RoleName : '';
  }


  filteredUsers(): Registration[] {
    if (!this.searchTerm) {
      return this.registerService.registration;
    }
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.registerService.registration.filter(registration =>
      registration.Staff.StaffName.toLowerCase().includes(searchTermLower)
    );
  }



  Updateusers(register: Registration): void {
    console.log(register);
    this.populatedoctorData(register);
    this.router.navigate(['/uregistration/edit/' + register.RegistrationId]);
    //Call Populate Employee
  }

  // Populate staff data for update
  populatedoctorData(register: Registration): void {
    console.log('Inside populatedoctorData method');
    console.log(register);
    this.registerService.formStaffData = { ...register };
  }


  deleteUser(register: Registration) {
    //confirmation
    if (confirm('Are your sure to DELETE this Record')) {
      //As If deletion, set IsActive = false
      register.RisActive = false;
      this.registerService.Updateusers(register).subscribe(
        (response) => {
          console.log(response);
          this.toastr.info('Employee has been deleted successfully', 'EMS v2024');
          this.registerService.getAllusers();
        },
        (error) => {
          console.log(error);
          this.toastr.error('Something wrong! try again...', 'EMS v2024');
        }
      );

    }
  }
}