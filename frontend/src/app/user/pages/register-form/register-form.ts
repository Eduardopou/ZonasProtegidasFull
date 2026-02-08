import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPageComponent } from "../../../components/header-page/header-page";
import { AbstractControl, FormControl, FormGroup, Validators, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { BackButton } from "../../../components/back-button/back-button";

/**
 * Validador personalizado para confirmar que las contraseñas coinciden
 */
export const passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Si los campos aún no existen, no hacer nada
  if (!password || !confirmPassword) {
    return null;
  }

  // Si las contraseñas no coinciden, marca el error en el campo 'confirmPassword'
  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordsMismatch: true });
    return { passwordsMismatch: true };
  } else {
    // Si coinciden y el error estaba presente, límpialo
    if (confirmPassword.hasError('passwordsMismatch')) {
      confirmPassword.setErrors(null);
    }
    return null;
  }
};


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, HeaderPageComponent, ReactiveFormsModule, RouterLink, BackButton],
  templateUrl: './register-form.html',
  // Usamos el MISMO CSS que el login para mantener la estética
  styleUrls: ['./register-form.css']
})
export class RegisterForm {
  register_user_form: FormGroup;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.register_user_form = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    {
      // Añadimos el validador a nivel de FormGroup
      validators: passwordsMatchValidator
    });
  }

  

  post_register() {
    this.errorMessage = null;
    this.register_user_form.markAllAsTouched();

    if (this.register_user_form.invalid) {
      return;
    }

    // Creamos el objeto a enviar, excluyendo 'confirmPassword'
    const userData = {
      nombre: this.register_user_form.value.nombre,
      email: this.register_user_form.value.email,
      password: this.register_user_form.value.password
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        // Éxito: Redirigir al login con un mensaje (opcional)
        // Es mejor redirigir al login que loguear automáticamente tras el registro
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      },
      error: (error) => {
        // Manejo de errores comunes de registro
        if (error.status === 409 || error.status === 400) {
          this.errorMessage = 'El correo electrónico o el nombre de usuario ya están en uso.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
        }
        console.error('Registration failed', error);
      }
    });
  }
}