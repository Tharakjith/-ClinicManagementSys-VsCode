import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-receptionists',
  templateUrl: './receptionists.component.html',
  styleUrls: ['./receptionists.component.scss']
})
export class ReceptionistsComponent implements OnInit {

  constructor(private router: Router,private platformLocation: PlatformLocation) {}

  ngOnInit(): void {
    // Push an initial dummy state to the history
    history.pushState(null, '', window.location.href);

    // Disable the back button by listening for popstate
    window.onpopstate = () => {
      history.pushState(null, '', window.location.href);
    };

    // Prevent navigation using Router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.navigationTrigger === 'popstate') {
        // Redirect to the current route to block navigation
        this.router.navigateByUrl(this.router.url);
      }
    });
  }

}
