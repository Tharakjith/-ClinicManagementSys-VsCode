import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/shared/service/register.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.scss']
})
export class RegisterListComponent implements OnInit {
  page: number = 1;
  pageSize: number = 3;
  searchTerm: string = '';

  constructor(
    public registerService: RegisterService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerService.getAllusers();
    this.registerService.getAllRoles();
    
 
 
  } 

  getRoleName(roleId: number): string {
    const Role = this.registerService.role.find(c => c.RoleId === roleId);
    return Role ? Role.RoleName:'';
  }
  

  filteredUsers(): User[] {
    if (!this.searchTerm) {
      return this.registerService.user;
    }
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.registerService.user.filter(user =>
      user.Staff.StaffName.toLowerCase().includes(searchTermLower)
    );
  }

  Updateusers(user: User): void {
    this.registerService.formStaffData = { ...user };
    this.router.navigate(['/register/edit', user.RegistrationId]);
  }

  

  deleteUser(user: User): void {
    if (confirm('Are you sure you want to disable this record?')) {
      user.RIsActive = false;
      this.registerService.Updateusers(user).subscribe(
        () => {
          this.toastr.info('User has been disabled successfully', 'EMS');
          this.registerService.getAllusers();
        },
        error => {
          console.error(error);
          this.toastr.error('Something went wrong! Please try again.', 'EMS');
        }
      );
    }
  }
}