import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';
import { User } from 'src/app/shared/model/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    isSubmitted: boolean = false;
    error: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            Username: ['', [Validators.required]],
            Password: ['', [Validators.required]]
        });
    }

    get formControls() {
        return this.loginForm.controls;
    }

    loginCredentials(): void {
        this.isSubmitted = true;

        if (this.loginForm.invalid) {
            this.toastr.error('Please enter username and password', 'CMS v2024');
            this.error = "Please enter username and password";
            return;
        }

        if (this.loginForm.valid) {
            this.error = '';
            
            this.authService.loginVerify(this.loginForm.value).subscribe(
                (response: User) => {
                    if (!response) {
                        this.error = "Invalid username and password";
                        return;
                    }

                    // Store common data
                    localStorage.setItem("User_name", response.Username);
                    localStorage.setItem("AccessRole", response.RoleId.toString());
                    localStorage.setItem("JWT Token", response.Token);

                    // Handle different role redirections
                    switch (response.RoleId) {
                        case 1: // Admin
                            this.router.navigate(['auth/admin']);
                            break;
                        case 2: // Doctor
                            if (response.DoctorId) {
                                // Store DoctorId for future use
                                localStorage.setItem("DoctorId", response.DoctorId.toString());
                                // Redirect to doctor's appointment list with their specific DoctorId
                                this.router.navigate(['/doctor/list', response.DoctorId]);
                            } else {
                                this.error = "Doctor ID not found";
                            }
                            break;
                        case 3: // Receptionist
                            this.router.navigate(['patients/list']);
                            break;
                        case 4: // Pharmacist
                            this.router.navigate(['auth/pharmacist']);
                            break;
                        case 5: // Lab Technician
                            this.router.navigate(['labtests/labtests']);
                            break;
                        default:
                            this.error = "Sorry.. Invalid credentials not allowed";
                    }
                },
                (error) => {
                    console.error(error);
                    this.error = "Invalid username and password";
                }
            );
        }
    }
}