import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UsersService } from 'src/app/shared/service/users.service';
import { User } from 'src/app/shared/model/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
// Pagination variables
page: number = 1;
pageSize: number = 3;

// Search term
searchTerm: string = '';
  constructor(public userService: UsersService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void { console.log('Hi, I am the users list component.');
    this.userService.getAllUsers();
    this.userService.getAllStaffs();
    this.userService.getAllRoles();
  }
// Filter staff based on search term
filteredusers() {
  if (!this.searchTerm) {
    return this.userService.user;
  }
  const searchTermLower = this.searchTerm.toLowerCase();
  return this.userService.user.filter(user => {
    const rCode = `R${user.RegistrationId}`.toLowerCase();
    return (
      user.Username?.toLowerCase().includes(searchTermLower) ||
      rCode.includes(searchTermLower)
    );
  });
}

Updateuser(user:User):void{
  console.log(user);
  this.populateUsersData(user);
  this.router.navigate(['/users/edit/'+user.RegistrationId]);
  //Call Populate Employee
}

// Populate staff data for update
populateUsersData(user: User): void {
  console.log('Inside populateUsersData method');
  console.log(user);

  // Transform date format to YYYY-MM-DD using DatePipe
  var datePipe = new DatePipe('en-UK');
  let formattedDate: any= datePipe.transform(user.RegisteredDate, 'yyyy-MM-dd');
 
  user.RegisteredDate = formattedDate ; // Fallback to empty string if null
  this.userService.formUserData = { ...user };
}

// Delete staff record
deleteuser(user: User): void {
  if (confirm('Are you sure you want to DELETE this record?')) {
    user.RIsActive = false; // Mark staff as inactive
    this.userService.Updateusers(user).subscribe(
      response => {
        console.log(response);
        this.toastr.info('Staff has been deleted successfully', 'EMS v2024');
        this.userService.getAllUsers();
      },
      error => {
        console.error(error);
        this.toastr.error('Something went wrong! Please try again.', 'CMS');
      }
    );
  }
}
}



  
  

  
