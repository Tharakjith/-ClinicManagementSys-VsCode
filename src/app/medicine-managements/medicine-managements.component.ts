import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-medicine-managements',
  templateUrl: './medicine-managements.component.html',
  styleUrls: ['./medicine-managements.component.scss']
})
export class MedicineManagementsComponent implements OnInit {

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
