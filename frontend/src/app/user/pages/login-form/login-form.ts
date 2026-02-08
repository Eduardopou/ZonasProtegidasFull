import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderPageComponent } from "../../../components/header-page/header-page";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { BackButton } from "../../../components/back-button/back-button";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, HeaderPageComponent, ReactiveFormsModule, BackButton],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginFormComponent {
  login_user_form: FormGroup;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.login_user_form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  post_user() {
    this.errorMessage = null;
    this.login_user_form.markAllAsTouched();

    if (this.login_user_form.invalid) {
      // ...manejo de errores...
      return;
    }

    const credentials = {
      username: String(this.login_user_form.value.email),
      password: String(this.login_user_form.value.password)
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Espera a que el token y roles estén en localStorage
        setTimeout(() => {
          if (this.authService.hasRole('ROLE_ADMIN')) {
            this.router.navigate(['/admin/page-control-panel-component']);
          } else {
            this.router.navigate(['/']);
          }
        }, 0);
      },
      error: (error) => {
        this.errorMessage = 'Usuario o contraseña incorrectos. Intenta de nuevo.';
        console.error('Login failed', error);
      }
    });

    this.login_user_form.reset();
  }

  

  onForgotPassword(event: Event) {
    console.log('Forgot Password clicked');
    event.preventDefault();
  }

  login_redirect(event:Event){
    this.router.navigate(['/register']);

  }
}

