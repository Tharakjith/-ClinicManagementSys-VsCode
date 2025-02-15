import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Push an initial dummy state to the history
    history.pushState(null, '', window.location.href);

    // Disable the back button by overriding popstate event
    window.addEventListener('popstate', (event) => {
      event.preventDefault(); // Prevent default back navigation
      history.pushState(null, '', window.location.href);
    });
  }
  }


