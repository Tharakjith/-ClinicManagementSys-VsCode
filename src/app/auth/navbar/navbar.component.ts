import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
//declare variable
  user?:string ="";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("User_name")?.toString();
  }

  // //Call LogOut
  // logOut(): void{
  //   this.authService.logOutRemoveItems();
  // }

}
