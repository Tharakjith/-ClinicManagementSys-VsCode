// import { Component, OnInit } from '@angular/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <div class="overlay" *ngIf="show">
      <div class="dialog-box">
        <div class="content">
          <h4>Registration Successful!</h4>
          <p>Patient has been registered successfully.</p>
          <div class="buttons">
            <button class="btn btn-outline-info" (click)="onBookAppointment()">
              Book Appointment
            </button>
            <button class="btn btn-outline-secondary" (click)="onClose()">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .dialog-box {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 90%;
    }
    .content {
      text-align: center;
    }
    .buttons {
      margin-top: 20px;
    }
    .buttons button {
      margin: 0 10px;
    }
  `]
})
export class ConfirmationDialogComponent {
  @Input() show: boolean = false;
  @Output() bookAppointment = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onBookAppointment() {
    this.bookAppointment.emit();
  }

  onClose() {
    this.close.emit();
  }
}